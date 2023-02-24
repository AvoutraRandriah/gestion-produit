import Api from '@/services/Api'

export default { 
    register (data) {
         return Api().post('produit', data)
    },
    delete (data) {
        return Api().delete('produit/'+ data)
        },
    update (data) {
        return Api().put('produit', data)
        },
    getAll () {
        return Api().get('produit')
        },
    getMax(){
        return Api().get('produit/max')
    }
 }
 