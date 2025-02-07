import { UserRepositoryInterface } from "@triumph-motorcycles/application/repositories/UserRepositoryInterface";
import { UserEntity } from "@triumph-motorcycles/domain/entities/user/UserEntity";
import { SearchQueryCannotBeEmptyError } from "@triumph-motorcycles/domain/errors/user/SearchQueryCannotBeEmptyError";


export class SearchUserByFirstOrLastNameUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async execute(query: string): Promise<UserEntity[] | Error> {
    console.log("SearchUserByFirstOrLastNameUseCase...", query)

    if (!query) return new SearchQueryCannotBeEmptyError();
    console.log("query...", query)
    return this.userRepository.findByFirstOrLastName(query);
  }
}
