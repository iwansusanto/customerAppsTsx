import { 
    CLICK_HOME_BANNER_CATEGORY,
    CLICK_HOME_BANNER_CATEGORY_SUCCESS,
    CLICK_HOME_BANNER_CATEGORY_FAILED,
    FETCH_BANNER_HOMEPAGE,
    FETCH_BANNER_HOMEPAGE_SUCCESS,
    FETCH_BANNER_HOMEPAGE_FAILED
} from './types'

export const clickBannerAction = (params, onSuccess, onError) => ({
    type: CLICK_HOME_BANNER_CATEGORY,
    payload : params,
    onSuccess,
    onError
})

export const clickBannerSuccess = (data) => ({
    type: CLICK_HOME_BANNER_CATEGORY_SUCCESS,
    payload : data
})

export const clickBannerFailed = (error) => ({
    type: CLICK_HOME_BANNER_CATEGORY_FAILED,
    payload : error
})

export const fetchBannerHomepage = (params, onSuccess, onError) => ({
    type: FETCH_BANNER_HOMEPAGE,
    payload : params,
    onSuccess,
    onError
})

export const fetchBannerHomepageSuccess = (data) => ({
    type: FETCH_BANNER_HOMEPAGE_SUCCESS,
    payload : data
})

export const fetchBannerHomepageFailed = (error) => ({
    type: FETCH_BANNER_HOMEPAGE_FAILED,
    payload : error
})