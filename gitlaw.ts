require('dotenv').config();
import {
  BranchProtection,
  RepoPolicyOwner,
  RequireRepoPolicy,
  Config,
  PolicyType,
  consoleReporter,
} from 'git-law';

const token = process.env.GITHUB_TOKEN;

if (!token) {
  throw new Error('No GITHUB_TOKEN provided');
}

const config: Config = {
  auth: {
    token,
  },
  rules: {
    'require-policy': new RequireRepoPolicy(),
    'policy-owner': new RepoPolicyOwner({
      owner: '@morten-olsen',
    }),
    'review-required': new BranchProtection({
      requiredReviewers: 1,
    }),
  },
  repos: {
    include: ['morten-olsen/*'],
    exclude: ['morten-olsen/mortens-law'],
  },
  // onlyConfiguredRepos: true,
  policyFile: '.github/policy.yml',
  policy: {
    default: {
      'require-policy': PolicyType.Recommended,
      'policy-owner': PolicyType.Recommended,
      'review-required': PolicyType.Required,
    },
  },
  reporters: [
    consoleReporter,
  ],
};

export default config;
