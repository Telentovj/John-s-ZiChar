<template>
    <div>
        <p class = "header">John's Zi Char</p>
        <ul class = "ul">
            <router-link to="/" class="routes">Home</router-link>
            <router-link to="/orders" class="routes">Orders</router-link>
        </ul>
            <ul class = "ul">
                <li class = "li" v-for="order in orders" :key="order">
                    <ul class="foodList ul">
                        <div class="foodContainer">
                            <div class="foodinnerContainer">
                                <li class="food li" v-for="singleFood in order[1]" :key="singleFood">
                                    <p>{{singleFood}}</p>
                                </li>
                            </div>
                            <button class="myButton" v-bind:id = order[0] v-on:click="deleteItem($event)">Delete</button>
                            <button class="myButton" v-bind:id = order[0] v-on:click="route($event)">Modify</button>
                        </div>
                    </ul>  
                </li>
            </ul>  
    </div>
</template>

<script>
import db from "../firebase.js";
export default {
    data(){
        return{
            orders:[],
        }
    },
    methods:{
        fetchItems: function(){
            db.collection('orders').get().then(snapshot =>{
                snapshot.docs.forEach(doc =>{
                    this.orders.push([doc.id,doc.data().orders]); //push items into array here
                })
            })
        },
        deleteItem(event){
            let doc_id = event.target.getAttribute("id");
            console.log(doc_id);
            db.collection('orders').doc(doc_id).delete().then(() =>{
                location.reload();
             });     
        },
        route(event){
            let doc_id = event.target.getAttribute("id");
            this.$router.push({name: 'Modify', params: { id: doc_id }});
        },
    },
    created(){
        this.fetchItems();
    }
}
</script>

<style>

.food{
  flex-grow: none;
  flex-basis: none;
  text-align: center;
  border: 0px solid #222;
  padding: 0px;
}

.foodList {
  display: block;
  flex-wrap: none;
  list-style-type: none;
  padding: 0;
}

.myButton{
    padding:10px;
    margin:10px;
    height:10%;
    align-content: center;
}

.foodContainer{
   display: flex;
}

.foodinnerContainer{
    flex: 50%;
}


</style>