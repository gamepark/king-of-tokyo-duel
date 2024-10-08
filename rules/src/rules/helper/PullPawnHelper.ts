import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Monster } from '../../material/Monster'

export class PullPawnHelper extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: Monster) {
    super(game)
  }
}