#!/bin/sh
cd /some
cp access.log $(data +%Y-%m-%d).access.log
echo "" > access.log