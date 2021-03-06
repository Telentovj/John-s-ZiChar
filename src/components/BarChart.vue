<template>
  <div class="chart">
    <div v-if="isLoaded">
      <chart :dishesOrdered="dishesOrdered"></chart>
    </div>
  </div>
</template>

<script>
import db from "../firebase.js";
import Chart from "./BarChart.js";
export default {
    components: {
        Chart
    },
    data(){
        return{
            dishesOrdered:[0,0,0,0,0,0],
            order: [],
            isLoaded:false,
        }
    },
    methods:{
        parseOrder: function(){
            for (let i = 0; i < this.order.length; i++){
                if(this.order[i].lastIndexOf("Sambal") != -1){
                    this.dishesOrdered[0]+= parseInt(this.order[i].slice(-2).trim());
                }
                if(this.order[i].lastIndexOf("Cereal") != -1){
                    this.dishesOrdered[1]+= parseInt(this.order[i].slice(-2).trim());
                }
                if(this.order[i].lastIndexOf("Omelette") != -1){
                   this.dishesOrdered[2]+= parseInt(this.order[i].slice(-2).trim());
                }
                if(this.order[i].lastIndexOf("Pork") != -1){
                    this.dishesOrdered[3]+= parseInt(this.order[i].slice(-2).trim());
                }
                if(this.order[i].lastIndexOf("Mapo") != -1){
                    this.dishesOrdered[4]+= parseInt(this.order[i].slice(-2).trim());
                }
                if(this.order[i].lastIndexOf("Dry") != -1){
                    this.dishesOrdered[5]+= parseInt(this.order[i].slice(-2).trim());
                }   
            }
        }
    },
    created(){
        db.collection('orders').get().then(snapshot =>{
                snapshot.docs.forEach(doc=>{
                    this.order = doc.data().orders;
                    this.parseOrder();
                    }
                )
                 this.isLoaded = true;
       });
    }
};
</script>

<style>
</style>