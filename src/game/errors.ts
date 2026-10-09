/** A rule the engine refuses to break. The UI can show `message`. */
export class GameRuleError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GameRuleError'
  }
}
