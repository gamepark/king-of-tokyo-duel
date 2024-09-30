import { isEndGame, isStartPlayerTurn, isStartRule, MaterialMove, RuleMove, StartPlayerTurn, StartRule } from '@gamepark/rules-api'

export const isChangingRule = (move: MaterialMove): move is RuleMove => {
  return isStartingRule(move) || isEndGame(move)
}

export const isStartingRule = (move: MaterialMove): move is StartRule | StartPlayerTurn => {
  return isStartRule(move) || isStartPlayerTurn(move)
}