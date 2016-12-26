#!/usr/bin/env bash

npm install -g --save forever react react-dom react-addons-pure-render-mixin classnames react-modal

meteor npm install
meteor remove insecure
meteor remove autopublish

meteor add react-meteor-data
meteor add themeteorchef:bert
meteor add accounts-ui accounts-password
