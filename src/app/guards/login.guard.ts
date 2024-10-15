import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('token')) {
    return true;
  } else {
    return false;
  }
};

export const adminGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('rol2') === 'admin') {
    return true;
  } else {
    return false;
  }
};

export const mecanicoGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('rol2') === 'mecanico') {
    return true;
  } else {
    return false;
  }
};
