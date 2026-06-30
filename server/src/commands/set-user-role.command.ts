
import { Command, CommandRunner, Option } from 'nest-commander';
import { UserService } from '../user/user.service.js';


@Command({ name: 'set-user-role', description: 'Set all the users role to member' })
export class SetUserRoleCommand extends CommandRunner {
  constructor(private readonly userService: UserService) {
    super()
  }

  async run(): Promise<void> {
    const count = await this.userService.setAllUsersToMember();

    console.log(`Updated ${count} users.`);
  }
}
