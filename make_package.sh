#!/bin/sh
# Clear out old files first
rm package.zip
rm *~
rm package/*~
zip package.zip package/*
