<template>
  <div id="app">
    <div class="app-view-header">
      <h1><b-badge variant="secondary">Smart Factory Dashboard created by vue</b-badge></h1>
    </div>
    <div class="row">
      <div class="app-view-column side">
        <b-button variant="outline-dark" to="/dashboard">
          Dashboard
        </b-button>
        <b-button variant="outline-dark" to="/map">
          Map
        </b-button>
      </div>
      <div class="app-view-column middle">
        <router-view/>
      </div>
    </div>
    <div class="app-view-footer">
      <h4><b-badge pill variant="secondary">created by VUE</b-badge></h4>
    </div>
  </div>
</template>
