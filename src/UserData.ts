import { User } from './utils/types';

export class UserData implements User {
  constructor(profileName: string, repoName: string) {
    this.profileName = profileName;
    this.repoName = repoName;
    this.profileNameInLowerCase = profileName.toLowerCase();
    this.linkToPublicFile = `https://${this.profileNameInLowerCase}.github.io/${this.repoName}/`;
    this.linkToRepo = `https://github.com/${this.profileName}/${this.repoName}`;
  }
  profileName: string;
  repoName: string;
  profileNameInLowerCase: string;
  linkToPublicFile: string;
  linkToRepo: string;
}
