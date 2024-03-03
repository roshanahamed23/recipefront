import React from "react";
export const useGetUser=()=>{
    return window.localStorage.getItem('userID');
}