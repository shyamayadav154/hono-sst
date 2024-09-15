/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "hono-sst",
      home: "aws",
      providers: {
        aws: {
          region:'ap-south-1',
          profile: input.stage === "shyam-prod" ? "shyam-prod" : "shyam-dev",
        },
      },
      removal: input?.stage === "production" ? "retain" : "remove",
    };
  },
  async run() {
    const hono = new sst.aws.Function("Hono", {
      url: true,
      handler: "index.handler",
    });

    return {
      api: hono.url,
    };
  },
});
