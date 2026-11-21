/**
 * Administration domain services and wire schemas:
 * - Login (`POST /Login/Validate`)
 */

import { z } from "zod";

import type { RequestOptions } from "../../types/index.js";
import type { SageRequestExecutor } from "../executor.js";

export const AuthenticationCredentialsSchema = z
  .object({
    Username: z.string().min(1),
    Password: z.string().min(1),
  })
  .strict();

export type AuthenticationCredentials = z.infer<typeof AuthenticationCredentialsSchema>;

export class LoginService {
  private readonly executor: SageRequestExecutor;

  public constructor(executor: SageRequestExecutor) {
    this.executor = executor;
  }

  /**
   * `POST /Login/Validate` — Validate the user credentials based on the Authentication Credentials request model.
   * This endpoint does not require an existing Basic Authorization header.
   */
  public async validate(
    credentials: AuthenticationCredentials,
    options?: RequestOptions,
  ): Promise<boolean> {
    return this.executor.request({
      resource: "Login",
      operation: "Validate",
      method: "POST",
      path: "/Login/Validate",
      body: credentials,
      requestSchema: AuthenticationCredentialsSchema,
      responseSchema: z.boolean(),
      requiresAuthentication: false,
      options,
    });
  }
}

