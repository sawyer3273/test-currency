<template>
    <div class="min-h-screen w-screen lg:w-auto" >
        <v-layout class="" ref="app">
        <slot name="header"></slot>
        <slot name="navigation"></slot>
    
        <v-main class="w-full">
            <div class="flex items-center justify-center w-full absolute px-6 xl:px-0">
                <div class="row w-full xl:max-w-6xl xl:mx-auto">
                    <slot />
                </div>
            </div>
        </v-main>
    
        <slot name="footer"></slot>
        </v-layout>
    </div>
  </template>