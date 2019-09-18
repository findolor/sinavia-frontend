export const gameContentTypes = {
    SAVE_CHOOSEN_EXAM: 'save_choosen_exam',
    SAVE_EXAM_LIST: 'save_exam_list',
    GET_FULL_EXAM_INFORMATION: 'get_full_exam_information',
    SAVE_EXAM_NAMES_LIST: 'save_exam_names_list',
    SAVE_COURSE_NAMES_LIST: 'save_course_names_list',
    SAVE_SUBJECT_NAMES_LIST: 'save_subject_names_list',
    GET_ALL_CONTENT: 'get_all_content'
}
// TODO THINK ABOUT CONTETT LATER IMPORTRRANT
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

const saveExamNamesList = examNamesList => {
    return {
        type: gameContentTypes.SAVE_EXAM_NAMES_LIST,
        payload: examNamesList
    }
}

const saveCourseNamesList = courseNamesList => {
    return {
        type: gameContentTypes.SAVE_COURSE_NAMES_LIST,
        payload: courseNamesList
    }
}

const saveSubjectNamesList = subjectNamesList => {
    return {
        type: gameContentTypes.SAVE_SUBJECT_NAMES_LIST,
        payload: subjectNamesList
    }
}

export const gameContentActions = {
    saveChoosenExam: saveChoosenExam,
    saveExamList: saveExamList,
    saveCourseList: saveCourseList,
    saveSubjectList: saveSubjectList,
    saveExamNamesList: saveExamNamesList,
    saveCourseNamesList: saveCourseNamesList,
    saveSubjectNamesList: saveSubjectNamesList
}
