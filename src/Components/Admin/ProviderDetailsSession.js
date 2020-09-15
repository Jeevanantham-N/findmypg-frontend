
class ProviderDetailsSession {
    setProviderdetails = (provider) => {
        localStorage.setItem("username",provider.username)
        localStorage.setItem("jwtToken",provider.jwtToken)
        if (provider.providerDetails.providerProfile === null) {
            localStorage.setItem("providerProfile",null)
        }
        else{
            localStorage.setItem("providerProfile",JSON.stringify(provider.providerDetails.providerProfile.profile))
        }
        delete provider.providerDetails.providerProfile
        localStorage.setItem("providerDetails",JSON.stringify(provider.providerDetails))
    }   
    getUsername = () => {
        return localStorage.getItem("username")
    }
    getjwtToken = () => {
        return localStorage.getItem("jwtToken")
    }
    getproviderProfile = () => {
        const providerProfile = JSON.parse(localStorage.getItem("providerProfile"))
        return providerProfile
    }
    setExpirationTime = () => {
        const date = new Date()
        date.setHours(date.getHours()+4)
        localStorage.setItem("providerexpiretime",JSON.stringify(date.getTime()))
    }
    getExpirationTime = () => {
        const date = JSON.parse(localStorage.getItem("providerexpiretime"))
        return date
    }
    isJwtExpired = () => {
        const date = new Date()
        date.setHours(date.getHours())
        if (this.getExpirationTime() > date.getTime()){
            return true
        }
        return false
    }
    getproviderDetails = () => {
        const providerDetails = JSON.parse(
        localStorage.getItem("providerDetails")
        )
        return providerDetails
    }
    removeProviderdetails = () => {
        localStorage.clear()
    }
    setNewProviderProfile = (profile) => {
        localStorage.setItem("providerProfile",JSON.stringify(profile))
    }
    setNewProviderdetails = (provider) => {
        delete provider.providerProfile
        localStorage.setItem("providerDetails",JSON.stringify(provider))
    }
}

export default new ProviderDetailsSession()