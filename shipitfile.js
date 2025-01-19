module.exports = (shipit) => {
  require("shipit-deploy")(shipit);
  require("shipit-shared")(shipit);

  const useProxyJump = process.env.SHIPIT_USE_PROXY_JUMP !== "false";

  const withExtraSshOptions = (server) => ({
    ...server,
    extraSshOptions: {
      StrictHostKeyChecking: "no",
      ...(useProxyJump ? { ProxyJump: "sti@172.29.220.28" } : {}),
    },
  });

  shipit.initConfig({
    default: {
      deployTo: "/opt/deploys/otpapi",
      repositoryUrl:
        "https://gitlab+deploy-token-66:glpat-KQusiJtxKzEjNCsy_zDb@gitlabpan2.sva.antel.com.uy/desa/otpapi.git",
      restartService: {
        command: "sudo systemctl restart otpapi.service",
      },
      getInstallDependeciesCommand: (releasePath) =>
        `cd ${releasePath} && node -v && npm install`,
      shared: {
        overwrite: true,
        dirs: ["logs"],
        files: [".env"],
      },
    },
    testing: {
      branch: "testing",
      getInstallDependeciesCommand: (releasePath) =>
        `nvm use v18.14.0 && cd ${releasePath} && node -v && npm install`,
      servers: [
        {
          host: "10.64.143.90",
          user: "sti",
        },
      ].map(withExtraSshOptions),
    },
    preprod: {
      branch: "preprod",
      servers: [
        {
          host: "10.64.143.107",
          user: "sti",
        },
        {
          host: "10.64.143.108",
          user: "sti",
        },
      ].map(withExtraSshOptions),
    },
    production: {
      branch: process.env.CI_COMMIT_TAG || "master",
      servers: [
        {
          host: "10.64.141.190",
          user: "sti",
        },
        {
          host: "10.64.141.191",
          user: "sti",
        },
        {
          host: "10.64.141.192",
          user: "sti",
        },
        {
          host: "10.64.141.193",
          user: "sti",
        },
        {
          host: "10.64.141.194",
          user: "sti",
        },
      ].map(withExtraSshOptions),
    },
  });

  shipit.blTask("install-dependencies", async () => {
    await shipit.remote(
      shipit.config.getInstallDependeciesCommand(shipit.releasePath)
    );
  });

  shipit.blTask("restart-service", async () => {
    await shipit.remote(shipit.config.restartService.command, { tty: false });
  });

  shipit.on("init", () => {
    shipit.on("updated", () => {
      shipit.start("install-dependencies");
    });

    shipit.on("published", () => {
      shipit.start("restart-service");
    });
  });
};
