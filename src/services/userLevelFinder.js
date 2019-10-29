// Change score dynamically for every kind of subject
export const levelFinder = userScore => {
    let level = 1,
        levelProgressScore = 0,
        levelProgressLimit = 0

    if (userScore === 0)
        return { level, levelProgressScore, levelProgressLimit }

    if (userScore < 2000) {
        level = userScore / 500 + 1
        levelProgressScore = userScore % 500
        levelProgressLimit = 500
    } else if (userScore < 5000) {
        level = (userScore - 2000) / 750 + 5
        levelProgressScore = (userScore - 2000) % 750
        levelProgressLimit = 750
    } else if (userScore < 11000) {
        level = (userScore - 5000) / 1000 + 9
        levelProgressScore = (userScore - 5000) % 1000
        levelProgressLimit = 1000
    } else if (userScore < 20000) {
        level = (userScore - 11000) / 1500 + 15
        levelProgressScore = (userScore - 11000) % 1500
        levelProgressLimit = 1500
    } else {
        level = (userScore - 20000) / 2000 + 21
        levelProgressScore = (userScore - 20000) % 2000
        levelProgressLimit = 2000
    }
    return { level, levelProgressScore, levelProgressLimit }
}
