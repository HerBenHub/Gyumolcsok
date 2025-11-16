import express from 'express';

export default function logger(req, res, next) {
    console.log(`Az alábbi művelet történt: ${req.method}, Útvonal: ${req.url} `);
    next();
}