import { forgotPassword } from '../../services/apiServices/user/forgotPassword'

export async function resetPassword(email) {
    const res = forgotPassword(email)

    return res
}
