import { rejectOngoingMatch } from '../../services/apiServices/notification/rejectOngoingMatch'

export const rejectOngoingMatchService = async (
    clientToken,
    ongoingMatchId
) => {
    return rejectOngoingMatch(clientToken, ongoingMatchId)
}
