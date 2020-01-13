import { apiServicesTree, makePostRequest } from '../../services/apiServices'

export const sendReceiptService = async (clientToken, clientId, receipt) => {
    return makePostRequest(apiServicesTree.purchaseReceiptApi.sendReceipt, {
        userId: clientId,
        clientToken: clientToken,
        receipt: receipt
    })
}
