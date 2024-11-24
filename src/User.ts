import { IUser } from './utils/types';

export class User implements IUser {
  constructor(
    public profileName: string,
    public repoName: string
  ) {
    this.profileName = profileName;
    this.repoName = repoName;
  }

  get linkToPublicFile(): string {
    return `https://${this.profileName.toLowerCase()}.github.io/${this.repoName}/`;
  }

  get linkToRepo(): string {
    return `https://github.com/${this.profileName}/${this.repoName}`;
  }
}
// убрать конструктор и устанавливать поля profileName и repoName сеттерами?
