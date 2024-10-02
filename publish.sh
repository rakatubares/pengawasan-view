#!/bin/bash
if [ $1 = "prod" ];
then
	f="p2"
else
	f="pengawasan-dev"
fi
scp -P 212 -r dist/* dukteksoetta@192.168.146.10:/html/$f.bcsoetta.org
