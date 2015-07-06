Working directory for some ivpn.net cleanvpn forensics... no formal conclusions just yet.

Just added:

Note that the windows installer drops file nsdialogs.dll (SHA1: b1e30808198a3ae6d6d1cca62df8893dc2a7ad43); virustotal gives it a pretty clean bill of health (https://www.virustotal.com/en/file/e31ad6c6e82e603378cb6b80e67d0e0dcd9cf384e1199ac5a65cb4935680021a/analysis/)... however, threatexpert shows it as not only packaged with some nasty stuff indeed (http://www.threatexpert.com/report.aspx?md5=adb8661f9d9f2820b195913d330a1cc3), but itself flagged as as threat in 93% of observed submissions via heuristic analyses (http://www.threatexpert.com/files/nsDialogs.dll.html). Which, on balance, is a rather dark picture for this shallow a dive into the analysis: the first installer reviewed (Windows), using off the shelf forensic sweeps in VM'd test sandboxes...

(according to threatexpert, the file itself is found in close association with Trojandownloader.Win32.Lipler [Ikarus], in fact)

more data on that trojan package: 

http://www.microsoft.com/security/portal/threat/encyclopedia/entry.aspx?Name=TrojanDownloader:Win32/Wintrim.CB

https://www.google.fr/search?q=Trojan-Downloader.Win32.Lipler+%5BIkarus%5D&oq=Trojan-Downloader.Win32.Lipler+%5BIkarus%5D



Some helpful URLs, to keep them from being lost in the shuffle:

https://malwr.com/analysis/ZjIyZjUyMWJkNzkxNDZkMGIyMjc0YzcyZGU0ZjI2YWY/

https://www.google.fr/search?q=c17103ae9072a06da581dec998343fc1&oq=c17103ae9072a06da581dec998343fc1

https://www.virustotal.com/en/file/dc58d8ad81cacb0c1ed72e33bff8f23ea40b5252b5bb55d393a0903e6819ae2f/analysis/1387427909/

https://www.virustotal.com/en/file/e31ad6c6e82e603378cb6b80e67d0e0dcd9cf384e1199ac5a65cb4935680021a/analysis/

http://www.malware-traffic-analysis.net/2013/12/19/index.html

[quote]The malware acts like a Trojan dropper.  I didn't notice any callback traffic; however, it dropped two files in the AppData\Local\Temp directory:

C:\Users\User-1\AppData\Local\Temp\nsw1DDE.tmp\System.dll
File size:  11.0 KB ( 11264 bytes )
MD5 hash:  c17103ae9072a06da581dec998343fc1 
Virus Total says this is probably harmless:  https://www.virustotal.com/en/file/dc58d8ad81cacb0c1ed72e33bff8f23ea40b5252b5bb55d393a0903e6819ae2f/analysis/1387427909/
C:\Users\User-1\AppData\Local\Temp\nsh1DCE.tmp\dblponmr.dll
The above is copied to  C:\Users\User-1\AppData\Local\Gxhomedia\DWGImporter.dll
File size:  573.5 KB ( 587264 bytes )
MD5 hash:  701b6f32d529140e18b9d10298df2add
Virus Total check:  https://www.virustotal.com/en/file/1f6916a12d8294630d59ed71c971a6d7daf1609b6a95675f863cd14db415df4a/analysis/1387427816/
Malwr analysis:  https://malwr.com/analysis/Y2I5YjkwZWVhZTFhNDI4ZGExYzU4Mjc4ZjI0YjU2MTM/
NOTE:  DWGImporter.dll is a file name for a DWG Import Support Module in Autodesk Design Review.  I'm fairly certain this isn't an actual DWG import module.[/quote]
