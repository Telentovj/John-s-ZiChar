<template>
  <div>
      <p class = "header">John's Zi Char</p>
      <div class = "container">
        <ul class="ul">
          <li class = "li" v-for="item in this.items" :key="item.id">
              <b>{{item.name}}<br/></b>
              <img :src="item.imageURL"/>
              <p>{{"$" + item.price}}</p>
              <QuantityCounter v-bind:item = "item" vue: v-on:counter="onCounter"/>
          </li>
        </ul>
          <Basket class = "basket" v-bind:itemsSelected="itemsSelected"/>    
      </div>
  </div>
  
</template>

<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import db from "../firebase.js"

export default {  
  name: 'PageContent',
  components:{QuantityCounter, Basket},
  methods:{
    onCounter: function (item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
      } else {
        var existing = false;
        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];
            // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
            //the item coming in is a proper object but the thing we are pushing in is an array within an array, not an item.
            if(item.name == item_name & count != 0){
              existing = true;
              this.$set(this.itemsSelected[i],1,count);
              break;
            }
            // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
            if(item.name == item_name && count == 0){
              existing = true;
              this.$delete(this.itemsSelected, i);
              break;
            }
          } 
          if(!existing){
            this.itemsSelected.push([item.name, count, item.price]);
          }
          // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
        }
      },
      fetchItems: function(){
        db.collection('menu').get().then(snapshot =>{
          snapshot.docs.forEach(doc =>{
            this.items.push(doc.data()); //push items into array here
          })
        })
      }
  },
  data(){
    return{
      items:[],
      itemsSelected:[],
    }
  },
  created(){
      this.fetchItems();
  }
}
</script>

<style>


.container{
  display: flex;
  flex-direction: row;
}
.header{
  text-align: center;
  font-size: 36px;
  background:chocolate;
  color:white;
  padding: 40px;
}
b{
  font-size: 24px;
}

#itemsList {
  width: 100%;
  max-width: 80%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
.ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  width:70%;
}
.li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>