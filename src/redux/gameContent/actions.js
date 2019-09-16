export const gameContentTypes = {
    SAVE_CHOOSEN_EXAM: 'save_choosen_exam',
    SAVE_EXAM_LIST: 'save_exam_list',
    GET_FULL_EXAM_INFORMATION: 'get_full_exam_information',
    SAVE_COURSE_LIST: 'save_course_list',
    SAVE_SUBJECT_LIST: 'save_subject_list',
    GET_ALL_CONTENT: 'get_all_content'
}

const saveChoosenExam = choosenExam => {
    return {
        type: gameContentTypes.SAVE_CHOOSEN_EXAM,
        payload: choosenExam
    }
}

const saveExamList = examList => {
    return {
        type: gameContentTypes.SAVE_EXAM_LIST,
        payload: examList
    }
}

const saveCourseList = courseList => {
    return {
        type: gameContentTypes.SAVE_COURSE_LIST,
        payload: courseList
    }
}

const saveSubjectList = subjectList => {
    return {
        type: gameContentTypes.SAVE_SUBJECT_LIST,
        payload: subjectList
    }
}

export const gameContentActions = {
    saveChoosenExam: saveChoosenExam,
    saveExamList: saveExamList,
    saveCourseList: saveCourseList,
    saveSubjectList: saveSubjectList
}
