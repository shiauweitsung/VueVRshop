<template>
    <div>
        <!--/admin 網址-->
        <BackHeader/>
        <BackSide/>
        <router-view></router-view>
        
    </div>
</template>

<script>
import BackHeader from '../backHeader';
import BackSide from '../BackSidebar';
export default {
  components: {
    BackHeader,
    BackSide,
  }  
}
</script>