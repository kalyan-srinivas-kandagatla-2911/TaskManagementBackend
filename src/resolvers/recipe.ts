// recipesUtils.ts

import { SaveOptions, RemoveOptions } from "typeorm";
import { User } from "../entities/user";
import { AddRecipeInput } from "../types/user";

export class RecipesUtils {
    static create(newRecipeData: AddRecipeInput, user: User): User {
      // Assuming AddRecipeInput has fields like title, ingredients, etc.
      const { title } = newRecipeData;
  
      // Create a new User object (or Recipe object if it represents a recipe)
      const newRecipe: User = {
          // Assuming you have some logic to generate a unique ID
          id: generateUniqueId(),
          name: "",
          email: "",
          password: "",
          team: "Team_One",
          role: "c:/Users/ravin/Task_Management_backend/src/utils/userRole",
          hasId: function (): boolean {
              throw new Error("Function not implemented.");
          },
          save: function (options?: SaveOptions | undefined): Promise<User> {
              throw new Error("Function not implemented.");
          },
          remove: function (options?: RemoveOptions | undefined): Promise<User> {
              throw new Error("Function not implemented.");
          },
          softRemove: function (options?: SaveOptions | undefined): Promise<User> {
              throw new Error("Function not implemented.");
          },
          recover: function (options?: SaveOptions | undefined): Promise<User> {
              throw new Error("Function not implemented.");
          },
          reload: function (): Promise<void> {
              throw new Error("Function not implemented.");
          },
          
      };
  
      return newRecipe;
    }
  }

function generateUniqueId(): string {
    throw new Error("Function not implemented.");
}
  