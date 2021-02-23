<template>
  <div>
    <p class = "header">John's Zi Char</p>
    <div>
        <li class="food modifyli" v-for="(singleFood, index ) in datapacket" :key="singleFood">
            <p>{{singleFood}}</p>
            <input v-model="message" placeholder="0" :id = index type ="number" min = "0" >
        </li>
    </div>
    <button class="updateBtn" v-on:click="updateOrder()">Update Order</button>
  </div>
</template>

<script>
import db from "../firebase.js";
export default {
    data(){
        return{
            id: this.$route.params.id,
            datapacket: [],
            sambal: false,
            cereal: false,
            prawn: false,
            pork: false,
            mapo: false,
            dry: false,
            datapacketCopy:[],
            updateFlag:false,
        }
    },
    methods:{
        fetchItems: function(){
            console.log(this.id);
            db.collection('orders').doc(this.id).get().then(snapshot =>{
                this.datapacket = snapshot.data().orders;
                console.log(this.datapacket);
                this.parseOrder();
            })
        },
        parseOrder(){
            for (let i = 0; i < this.datapacket.length; i++){
                if(this.datapacket[i].lastIndexOf("Sambal") != -1){
                    this.sambal = true;
                }
                if(this.datapacket[i].lastIndexOf("Cereal") != -1){
                    this.cereal = true;
                }
                if(this.datapacket[i].lastIndexOf("Omelette") != -1){
                    console.log(this.datapacket[i]);
                    this.prawn = true;
                }
                if(this.datapacket[i].lastIndexOf("Pork") != -1){
                    this.pork = true;
                }
                if(this.datapacket[i].lastIndexOf("Mapo") != -1){
                    this.mapo = true;
                }
                if(this.datapacket[i].lastIndexOf("Dry") != -1){
                    this.dry = true;
                }   
            }
            console.log(this.prawn);
            if(!this.sambal){
                this.datapacket.push("Sambal KangKong: 0");
            }
            if(!this.cereal){
                this.datapacket.push("Cereal Prawn: 0");
            }
            if(!this.mapo){
                this.datapacket.push("Mapo Tofu: 0");
            }
            if(!this.dry){
                this.datapacket.push("Dry Beef Hor Fun: 0");
            }
            if(!this.pork){
                this.datapacket.push("Pork Fried Rice: 0");
            }
            if(!this.prawn){
                this.datapacket.push("Prawn Omelette: 0");
            }
            console.log(this.datapacket);
        },
        updateOrder: function(){
            this.datapacketCopy = [];
            for (let i = 0; i < this.datapacket.length; i++){
                if(document.getElementById(i).value == ""){
                    this.datapacketCopy.push(this.datapacket[i].split(":")[0] + " : 0");
                }else{
                    this.datapacketCopy.push(this.datapacket[i].split(":")[0] + " : " + document.getElementById(i).value);
                    this.updateFlag = true;
                }
            }
            if(!this.updateFlag){
                alert("Please order some food!")
            }else{
                db.collection('orders').doc(this.id).set({
                    orders: this.datapacketCopy,
                }).then(()=>{
                    this.$router.push({name: 'Orders'});
                });
            }
        }
    },
    created(){
        this.fetchItems();
    }
}
</script>

<style>
.modifyli{
    list-style-type: none;
    text-align: left;
}
.updateBtn{
    margin: 20px 10px 10px 0px;
}
</style>