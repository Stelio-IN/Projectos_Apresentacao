<template>

<div class="list-wrapper" ng-app="app" ng-controller="MainCtrl as ctrl">
  <ul class="list">
    <li class="list-item">
      <div>
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/488320/profile/profile-80.jpg" class="list-item-image">
      </div>
      <div class="list-item-content">
        <h4>Hitesh Kumar</h4>
        <p>@hk-skit</p>
      </div>
    </li>

  </ul>
</div>

    </template>

    <script>
    export default {

    }
</script>

<style>
body {
  color: #555;
  background-color: #5B9EED;
  font-family: sans-serif;
}

.list-wrapper {
  max-width: 400px;
  margin: 50px auto;
}

.list {
  background: #fff;
  border-radius: 2px;
  list-style: none;
  padding: 10px 20px;
}

.list-item {
  display: flex;
  margin: 10px;
  padding-bottom: 5px;
  padding-top: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.list-item:last-child {
  border-bottom: none;
}
.list-item-image {
  border-radius: 50%;
  width: 64px;
}
.list-item-content {
  margin-left: 20px;
}
.list-item-content h4, .list-item-content p {
  margin: 0;
}
.list-item-content h4 {
  margin-top: 10px;
  font-size: 18px;
}
.list-item-content p {
  margin-top: 5px;
  color: #aaa;
}

</style>