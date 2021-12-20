const config = {
  use: {
    headless: false,
    //   viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "on-first-retry", // retain-on-failure
    reporter: [["html", { open: "never" }]],
  },
};

module.exports = config;

// export default {
//   boschurl: "http://iot2.hyperthings.in:6010/",
//   bun: "boschadmin",
// };
