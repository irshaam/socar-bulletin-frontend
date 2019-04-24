import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL

const instance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

/** 
 * Get All Categories
 */
export const getCategories = () => instance.get('/categories')

/** 
 * Get All Categories
 */
export const getCategory = (id) => instance.get('/categories/' + id)

/** 
 * Get All Topics
 */
export const getTopics = () => instance.get('/topics')

/**
 * Add Topic
 */
export const addTopic = (formData) => instance.post('/topics/create', formData  )

/** 
 * Get  Topic
 */
export const getTopic = (id) => instance.get('/topics/' + id)


/**
 * Post Comment
 */
export const addComment = (formData) => instance.post('/comments/create', formData)


