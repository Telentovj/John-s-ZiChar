<template>
  <div>
      <button v-on:click="fetchItems()"></button>
      <div class="foodContainer">
            <div class="foodinnerContainer">
                <li class="food" v-for="singleFood in datapacket" :key="singleFood">
                    <p>{{singleFood}}</p>
                </li>
            </div>
        </div>
  </div>
</template>

<script>
import db from "../firebase.js";
export default {
    data(){
        return{
            id: this.$route.params.id,
            datapacket: [],
        }
    },
    methods:{
        fetchItems: function(){
            console.log(this.id);
            db.collection('orders').doc(this.id).get().then(snapshot =>{
                this.datapacket = snapshot.data().orders;
                console.log(this.datapacket);
            })
        },
    },
}
</script>

<style>

</style>