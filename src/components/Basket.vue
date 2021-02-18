<template>
  <div>
      <p class = "headerMenu">Menu :</p>
      <ul>
        <li v-for="item in itemsSelected" :key="item.id">
            <p>{{item[0]+ " x " + item[1]}}</p>
        </li>
      </ul> 
      <button v-on:click='show(), sendOrder()' class="btn">Calculate Total</button>
      <p v-show="clicked">{{"Subtotal: $"  + total}}</p>
      <p v-show="clicked">{{"Grant Total: $" + totalGST}}</p>
  </div>
</template>

<script>
import db from "../firebase.js";

export default {
    name:"Basket",
    props:{
        itemsSelected: Array
    },
    computed:{
      total: function(){
        var total = 0;
        for (let i = 0; i < this.itemsSelected.length; i++){
          total += this.itemsSelected[i][1]*this.itemsSelected[i][2];
        }
        return Math.round(total * 100) / 100;
      },
      totalGST: function(){
        var total = 0;
        for (let i = 0; i < this.itemsSelected.length; i++){
          total += this.itemsSelected[i][1]*this.itemsSelected[i][2];
        }
        return Math.round(total*1.07 * 100) / 100;
      }
    },
    data(){
      return{
        clicked: false,
        order: [],
      }
    },
    methods:{
      show: function(){
        if(this.itemsSelected.length != 0){
          this.clicked = true;
        }
      },
      sendOrder: function(){
        this.order.splice(0);
        for(let i = 0; i < this.itemsSelected.length;i++){
          this.order.push(this.itemsSelected[i][0]);
          this.order.push(this.itemsSelected[i][1]);
        }
        db.collection('orders').add({
          orders: this.order
        }).then(() =>{
          location.reload();
        })
      }
    }
}
</script>

<style>
  .headerMenu{
    font-size: 36px;
    padding: 10px;
  }
  li{
    font-size: 24px;
  }
</style>