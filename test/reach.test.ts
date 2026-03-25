const assert = require("node:assert/strict");

const reach = require("../lib/reach");

module.exports = [
  {
    name: "weak tweet scores F on X",
    fn: () => {
      const result = reach.analyze({ platform: "x", draft: "Nice weather today" });
      assert.ok(result.x);
      assert.equal(result.x.grade, "F");
    }
  },
  {
    name: "strong opinion tweet with hook and question scores B or better on X",
    fn: () => {
      const draft = "Unpopular opinion: most founders waste months polishing logos instead of talking to customers. Your first 10 sales matter more than your brand. Agree?";
      const result = reach.analyze({ platform: "x", draft });
      assert.ok(result.x);
      assert.ok(result.x.score >= 70, `expected score >= 70, received ${result.x.score}`);
    }
  },
  {
    name: "zero hashtag instagram post scores zero on hashtag dimension",
    fn: () => {
      const result = reach.analyze({
        platform: "instagram",
        draft: "3 ways to make your content easier to save. Use stronger hooks, clearer steps, and a better CTA."
      });
      const hashtags = result.instagram.breakdown.find((item) => item.key === "hashtags");
      assert.ok(hashtags);
      assert.equal(hashtags.score, 0);
    }
  },
  {
    name: "hashtag stuffed instagram post scores lower than a 3 to 5 hashtag post",
    fn: () => {
      const stuffed = reach.analyze({
        platform: "instagram",
        draft: "Save this for later. 3 steps to build better captions. #a #b #c #d #e #f #g #h #i #j #k #l"
      });
      const healthy = reach.analyze({
        platform: "instagram",
        draft: "Save this for later. 3 steps to build better captions. #contentstrategy #instagramtips #creatorgrowth #copywriting"
      });
      const stuffedScore = stuffed.instagram.breakdown.find((item) => item.key === "hashtags").score;
      const healthyScore = healthy.instagram.breakdown.find((item) => item.key === "hashtags").score;
      assert.ok(stuffedScore < healthyScore);
    }
  },
  {
    name: "video imageMeta gives full visual score on Instagram",
    fn: () => {
      const result = reach.analyze({
        platform: "instagram",
        draft: "Save this system for later.",
        imageMeta: { type: "video" }
      });
      const visual = result.instagram.breakdown.find((item) => item.key === "visual");
      assert.ok(visual);
      assert.equal(visual.score, visual.max);
    }
  },
  {
    name: "analyze both returns x and instagram keys",
    fn: () => {
      const result = reach.analyze({
        platform: "both",
        draft: "3 mistakes creators make when they try to grow too fast."
      });
      assert.ok(result.x);
      assert.ok(result.instagram);
    }
  },
  {
    name: "score is capped at 100",
    fn: () => {
      const result = reach.analyze({
        platform: "instagram",
        draft: "3 ways to grow faster. Save this framework, bookmark it, and tag someone who needs it. #creatorgrowth #instagramtips #marketing #contentstrategy",
        imageMeta: { type: "video" },
        followers: 50000,
        engagementRate: 0.1
      });
      assert.ok(result.instagram.score <= 100);
    }
  },
  {
    name: "getOptimalWindows returns a topWindow with a hoursUntil field",
    fn: () => {
      const timing = reach.getOptimalWindows("x");
      assert.ok(timing.topWindow);
      assert.equal(typeof timing.topWindow.hoursUntil, "number");
    }
  },
  {
    name: "getEngagementPlaybook returns at least 5 steps",
    fn: () => {
      const playbook = reach.getEngagementPlaybook("instagram", 72);
      assert.ok(Array.isArray(playbook.steps));
      assert.ok(playbook.steps.length >= 5);
    }
  }
];
