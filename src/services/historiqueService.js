import Api from '@/services/Api'

export default {
    
    addHistoriqueCnx(data){
        return Api().post('connexion',data)
    },
    getHistoriqueCnx(data){
        return Api().post('historique-connexion',data)
    },
    updateHistoriqueCnx(data){
        return Api().put('connexion',data)
    },
    getHistoriqueAction (data){
        return Api().post('action',data)
    }
}