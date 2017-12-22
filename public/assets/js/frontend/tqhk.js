//定义利率
		lilv_array = new Array;
		//2004年之前的旧利率
		lilv_array[1] = new Array;
		lilv_array[1][1] = new Array;
		lilv_array[1][2] = new Array;
		lilv_array[1][1][5] = 0.0477;//商贷 1～5年 4.77%
		lilv_array[1][1][10] = 0.0504;//商贷 5-30年 5.04%
		lilv_array[1][2][5] = 0.0360;//公积金 1～5年 3.60%
		lilv_array[1][2][10] = 0.0405;//公积金 5-30年 4.05%
		//2005年	1月的新利率
		lilv_array[2] = new Array;
		lilv_array[2][1] = new Array;
		lilv_array[2][2] = new Array;
		lilv_array[2][1][5] = 0.0495;//商贷 1～5年 4.95%
		lilv_array[2][1][10] = 0.0531;//商贷 5-30年 5.31%
		lilv_array[2][2][5] = 0.0378;//公积金 1～5年 3.78%
		lilv_array[2][2][10] = 0.0423;//公积金 5-30年 4.23%
		//2006年	1月的新利率下限
		lilv_array[3] = new Array;
		lilv_array[3][1] = new Array;
		lilv_array[3][2] = new Array;
		lilv_array[3][1][5] = 0.0527;//商贷 1～5年 5.27%
		lilv_array[3][1][10] = 0.0551;//商贷 5-30年 5.51%
		lilv_array[3][2][5] = 0.0396;//公积金 1～5年 3.96%
		lilv_array[3][2][10] = 0.0441;//公积金 5-30年 4.41%
		//2006年	1月的新利率上限
		lilv_array[4] = new Array;
		lilv_array[4][1] = new Array;
		lilv_array[4][2] = new Array;
		lilv_array[4][1][5] = 0.0527;//商贷 1～5年 5.27%
		lilv_array[4][1][10] = 0.0612;//商贷 5-30年 6.12%
		lilv_array[4][2][5] = 0.0396;//公积金 1～5年 3.96%
		lilv_array[4][2][10] = 0.0441;//公积金 5-30年 4.41%
		//2006年	4月28日的新利率下限
		lilv_array[5] = new Array;
		lilv_array[5][1] = new Array;
		lilv_array[5][2] = new Array;
		lilv_array[5][1][5] = 0.0551;//商贷 1～5年 5.51%
		lilv_array[5][1][10] = 0.0575;//商贷 5-30年 5.75%
		lilv_array[5][2][5] = 0.0414;//公积金 1～5年 4.14%
		lilv_array[5][2][10] = 0.0459;//公积金 5-30年 4.59%
		//2006年	4月28日的新利率上限
		lilv_array[6] = new Array;
		lilv_array[6][1] = new Array;
		lilv_array[6][2] = new Array;
		lilv_array[6][1][5] = 0.0612;//商贷 1～5年 6.12%
		lilv_array[6][1][10] = 0.0639;//商贷 5-30年 6.39%
		lilv_array[6][2][5] = 0.0414;//公积金 1～5年 4.14%
		lilv_array[6][2][10] = 0.0459;//公积金 5-30年 4.59%
		//2006年	8月19日的新利率下限
		lilv_array[7] = new Array;
		lilv_array[7][1] = new Array;
		lilv_array[7][2] = new Array;
		lilv_array[7][1][5] = 0.0551;//商贷 1～5年 5.51%
		lilv_array[7][1][10] = 0.0581;//商贷 5-30年 5.81%
		lilv_array[7][2][5] = 0.0414;//公积金 1～5年 4.14%
		lilv_array[7][2][10] = 0.0459;//公积金 5-30年 4.59%
		//2006年	8月19日的新利率上限
		lilv_array[8] = new Array;
		lilv_array[8][1] = new Array;
		lilv_array[8][2] = new Array;
		lilv_array[8][1][5] = 0.0648;//商贷 1～5年 6.48%
		lilv_array[8][1][10] = 0.0684;//商贷 5-30年 6.84%
		lilv_array[8][2][5] = 0.0414;//公积金 1～5年 4.14%
		lilv_array[8][2][10] = 0.0459;//公积金 5-30年 4.59%
		//2007年	3月18日的新利率下限
		lilv_array[9] = new Array;
		lilv_array[9][1] = new Array;
		lilv_array[9][2] = new Array;
		lilv_array[9][1][5] = 0.0574;//商贷 1～5年 5.74%
		lilv_array[9][1][10] = 0.0604;//商贷 5-30年 6.04%
		lilv_array[9][2][5] = 0.0432;//公积金 1～5年 4.32%
		lilv_array[9][2][10] = 0.0477;//公积金 5-30年 4.77%
		//2007年	3月18日的新利率上限
		lilv_array[10] = new Array;
		lilv_array[10][1] = new Array;
		lilv_array[10][2] = new Array;
		lilv_array[10][1][5] = 0.0675;//商贷 1～5年 6.75%
		lilv_array[10][1][10] = 0.0711;//商贷 5-30年 7.11%
		lilv_array[10][2][5] = 0.0432;//公积金 1～5年 4.32%
		lilv_array[10][2][10] = 0.0477;//公积金 5-30年 4.77%
		//2007年	5月19日的新利率下限
		lilv_array[11] = new Array;
		lilv_array[11][1] = new Array;
		lilv_array[11][2] = new Array;
		lilv_array[11][1][5] = 0.0589;//商贷 1～5年 5.89%
		lilv_array[11][1][10] = 0.0612;//商贷 5-30年 6.12%
		lilv_array[11][2][5] = 0.0441;//公积金 1～5年 4.41%%
		lilv_array[11][2][10] = 0.0486;//公积金 5-30年 4.86%%
		//2007年	5月19日的新利率上限
		lilv_array[12] = new Array;
		lilv_array[12][1] = new Array;
		lilv_array[12][2] = new Array;
		lilv_array[12][1][5] = 0.0693;//商贷 1～5年 6.93%
		lilv_array[12][1][10] = 0.0720;//商贷 5-30年 7.20%
		lilv_array[12][2][5] = 0.0441;//公积金 1～5年 4.41%%
		lilv_array[12][2][10] = 0.0486;//公积金 5-30年 4.86%%
		//2007年	7月21日的新利率下限
		lilv_array[13] = new Array;
		lilv_array[13][1] = new Array;
		lilv_array[13][2] = new Array;
		lilv_array[13][1][5] = 0.0612;//商贷 1～5年 6.12%
		lilv_array[13][1][10] = 0.06273;//商贷 5-30年 6.273%
		lilv_array[13][2][5] = 0.0450;//公积金 1～5年 4.50%%
		lilv_array[13][2][10] = 0.0495;//公积金 5-30年 4.95%%
		//2007年	7月21日的新利率上限
		lilv_array[14] = new Array;
		lilv_array[14][1] = new Array;
		lilv_array[14][2] = new Array;
		lilv_array[14][1][5] = 0.0720;//商贷 1～5年 7.20%
		lilv_array[14][1][10] = 0.0738;//商贷 5-30年 7.38%
		lilv_array[14][2][5] = 0.0450;//公积金 1～5年 4.50%%
		lilv_array[14][2][10] = 0.0495;//公积金 5-30年 4.95%%
		//2007年	8月22日的新利率下限
		lilv_array[15] = new Array;
		lilv_array[15][1] = new Array;
		lilv_array[15][2] = new Array;
		lilv_array[15][1][5] = 0.06273;//商贷 1～5年 6.273%
		lilv_array[15][1][10] = 0.06426;//商贷 5-30年 6.426%
		lilv_array[15][2][5] = 0.0459;//公积金 1～5年 4.59%
		lilv_array[15][2][10] = 0.0504;//公积金 5-30年 5.04%
		//2007年	8月22日的新利率上限
		lilv_array[16] = new Array;
		lilv_array[16][1] = new Array;
		lilv_array[16][2] = new Array;
		lilv_array[16][1][5] = 0.0738;//商贷 1～5年 7.38%
		lilv_array[16][1][10] = 0.0756;//商贷 5-30年 7.56%
		lilv_array[16][2][5] = 0.0459;//公积金 1～5年 4.59%
		lilv_array[16][2][10] = 0.0504;//公积金 5-30年 5.04%
		//2007年	9月15日的新利率下限
		lilv_array[17] = new Array;
		lilv_array[17][1] = new Array;
		lilv_array[17][2] = new Array;
		lilv_array[17][1][5] = 0.06503;//商贷 1～5年 6.503%
		lilv_array[17][1][10] = 0.06656;//商贷 5-30年 6.656%
		lilv_array[17][2][5] = 0.0477;//公积金 1～5年 4.77%
		lilv_array[17][2][10] = 0.0522;//公积金 5-30年 5.22%
		//2007年	9月15日的新利率上限
		lilv_array[18] = new Array;
		lilv_array[18][1] = new Array;
		lilv_array[18][2] = new Array;
		lilv_array[18][1][5] = 0.0765;//商贷 1～5年 7.65%
		lilv_array[18][1][10] = 0.0783;//商贷 5-30年 7.83%
		lilv_array[18][2][5] = 0.0477;//公积金 1～5年 4.77%
		lilv_array[18][2][10] = 0.0522;//公积金 5-30年 5.22%
		//2007年	9月15日新利率(第二套房)
		lilv_array[19] = new Array;
		lilv_array[19][1] = new Array;
		lilv_array[19][2] = new Array;
		lilv_array[19][1][5] = 0.08415;//商贷 1～5年 8.415%
		lilv_array[19][1][10] = 0.08613;//商贷 5-30年 8.613%
		lilv_array[19][2][5] = 0.0477;//公积金 1～5年 4.77%
		lilv_array[19][2][10] = 0.0522;//公积金 5-30年 5.22%
		//2007年	12月21日的新利率下限
		lilv_array[20] = new Array;
		lilv_array[20][1] = new Array;
		lilv_array[20][2] = new Array;
		lilv_array[20][1][5] = 0.06579;//商贷 1～5年 6.579%
		lilv_array[20][1][10] = 0.06656;//商贷 5-30年 6.656%
		lilv_array[20][2][5] = 0.0477;//公积金 1～5年 4.77%
		lilv_array[20][2][10] = 0.0522;//公积金 5-30年 5.22%
		//2007年	12月21日的新利率上限
		lilv_array[21] = new Array;
		lilv_array[21][1] = new Array;
		lilv_array[21][2] = new Array;
		lilv_array[21][1][5] = 0.0851;//商贷 1～5年 8.514%
		lilv_array[21][1][10] = 0.0861;//商贷 5-30年 8.613%
		lilv_array[21][2][5] = 0.0477;//公积金 1～5年 4.77%
		lilv_array[21][2][10] = 0.0522;//公积金 5-30年 5.22%
		//2007年	12月21日新利率(第二套房)
		lilv_array[22] = new Array;
		lilv_array[22][1] = new Array;
		lilv_array[22][2] = new Array;
		lilv_array[22][1][5] = 0.0851;//商贷 1～5年 8.514%
		lilv_array[22][1][10] = 0.0861;//商贷 5-30年 8.613%
		lilv_array[22][2][5] = 0.0477;//公积金 1～5年 4.77%
		lilv_array[22][2][10] = 0.0522;//公积金 5-30年 5.22%
		//2008年	09月16日新利率下限
		lilv_array[23] = new Array;
		lilv_array[23][1] = new Array;
		lilv_array[23][2] = new Array;
		lilv_array[23][1][5] = 0.06426;//商贷 1～5年 6.426%
		lilv_array[23][1][10] = 0.06579;//商贷 5-30年 6.579%
		lilv_array[23][2][5] = 0.0459;//公积金 1～5年 4.59%
		lilv_array[23][2][10] = 0.0513;//公积金 5-30年 5.13%
		//2008年	09月16日新利率上限
		lilv_array[24] = new Array;
		lilv_array[24][1] = new Array;
		lilv_array[24][2] = new Array;
		lilv_array[24][1][5] = 0.0832;//商贷 1～5年 8.32%
		lilv_array[24][1][10] = 0.0851;//商贷 5-30年 8.51%
		lilv_array[24][2][5] = 0.0459;//公积金 1～5年 4.59%
		lilv_array[24][2][10] = 0.0513;//公积金 5-30年 5.13%
		//2008年	09月16日新利率(第二套房)
		lilv_array[25] = new Array;
		lilv_array[25][1] = new Array;
		lilv_array[25][2] = new Array;
		lilv_array[25][1][5] = 0.0832;//商贷 1～5年 8.32%
		lilv_array[25][1][10] = 0.0851;//商贷 5-30年 8.51%
		lilv_array[25][2][5] = 0.0459;//公积金 1～5年 4.59%
		lilv_array[25][2][10] = 0.0513;//公积金 5-30年 5.13%
		//2008年	10月09日新利率下限
		lilv_array[26] = new Array;
		lilv_array[26][1] = new Array;
		lilv_array[26][2] = new Array;
		lilv_array[26][1][5] = 0.062;//商贷 1～5年 6.20%
		lilv_array[26][1][10] = 0.0635;//商贷 5-30年 6.35%
		lilv_array[26][2][5] = 0.0432;//公积金 1～5年 4.32%
		lilv_array[26][2][10] = 0.0486;//公积金 5-30年 4.86%
		//2008年	10月09日新利率上限
		lilv_array[27] = new Array;
		lilv_array[27][1] = new Array;
		lilv_array[27][2] = new Array;
		lilv_array[27][1][5] = 0.0802;//商贷 1～5年 8.02%
		lilv_array[27][1][10] = 0.0822;//商贷 5-30年 8.22%
		lilv_array[27][2][5] = 0.0432;//公积金 1～5年 4.32%
		lilv_array[27][2][10] = 0.0486;//公积金 5-30年 4.86%
		//2008年	10月09日新利率(第二套房)
		lilv_array[28] = new Array;
		lilv_array[28][1] = new Array;
		lilv_array[28][2] = new Array;
		lilv_array[28][1][5] = 0.0802;//商贷 1～5年 8.02%
		lilv_array[28][1][10] = 0.0822;//商贷 5-30年 8.22%
		lilv_array[28][2][5] = 0.0432;//公积金 1～5年 4.32%
		lilv_array[28][2][10] = 0.0486;//公积金 5-30年 4.86%
		//2008年	10月27日新利率下限
		lilv_array[29] = new Array;
		lilv_array[29][1] = new Array;
		lilv_array[29][2] = new Array;
		lilv_array[29][1][5] = 0.051;//商贷 1～5年 5.10%
		lilv_array[29][1][10] = 0.0523;//商贷 5-30年 5.23%
		lilv_array[29][2][5] = 0.0405;//公积金 1～5年 4.05%
		lilv_array[29][2][10] = 0.0459;//公积金 5-30年 4.59%
		//2008年	10月27日新利率上限
		lilv_array[30] = new Array;
		lilv_array[30][1] = new Array;
		lilv_array[30][2] = new Array;
		lilv_array[30][1][5] = 0.0802;//商贷 1～5年 8.02%
		lilv_array[30][1][10] = 0.0822;//商贷 5-30年 8.22%
		lilv_array[30][2][5] = 0.0405;//公积金 1～5年 4.05%
		lilv_array[30][2][10] = 0.0459;//公积金 5-30年 4.59%
		//2008年	10月27日新利率基准
		lilv_array[31] = new Array;
		lilv_array[31][1] = new Array;
		lilv_array[31][2] = new Array;
		lilv_array[31][1][5] = 0.0729;//商贷 1～5年 7.29%
		lilv_array[31][1][10] = 0.0747;//商贷 5-30年 7.47%
		lilv_array[31][2][5] = 0.0405;//公积金 1～5年 4.05%
		lilv_array[31][2][10] = 0.0459;//公积金 5-30年 4.59%
		//2008年	10月27日新利率(第二套房)
		lilv_array[32] = new Array;
		lilv_array[32][1] = new Array;
		lilv_array[32][2] = new Array;
		lilv_array[32][1][5] = 0.0802;//商贷 1～5年 8.02%
		lilv_array[32][1][10] = 0.0822;//商贷 5-30年 8.22%
		lilv_array[32][2][5] = 0.0405;//公积金 1～5年 4.05%
		lilv_array[32][2][10] = 0.0459;//公积金 5-30年 4.59%
		//2008年	10月30日新利率下限
		lilv_array[33] = new Array;
		lilv_array[33][1] = new Array;
		lilv_array[33][2] = new Array;
		lilv_array[33][1][5] = 0.0491;//商贷 1～5年 4.91%
		lilv_array[33][1][10] = 0.0504;//商贷 5-30年 5.04%
		lilv_array[33][2][5] = 0.0405;//公积金 1～5年 4.05%
		lilv_array[33][2][10] = 0.0459;//公积金 5-30年 4.59%
		//2008年	10月30日新利率上限
		lilv_array[34] = new Array;
		lilv_array[34][1] = new Array;
		lilv_array[34][2] = new Array;
		lilv_array[34][1][5] = 0.0772;//商贷 1～5年 7.72%
		lilv_array[34][1][10] = 0.0792;//商贷 5-30年 7.92%
		lilv_array[34][2][5] = 0.0405;//公积金 1～5年 4.05%
		lilv_array[34][2][10] = 0.0459;//公积金 5-30年 4.59%
		//2008年	10月30日新利率基准
		lilv_array[35] = new Array;
		lilv_array[35][1] = new Array;
		lilv_array[35][2] = new Array;
		lilv_array[35][1][5] = 0.0702;//商贷 1～5年 7.02%
		lilv_array[35][1][10] = 0.0720;//商贷 5-30年 7.20%
		lilv_array[35][2][5] = 0.0405;//公积金 1～5年 4.05%
		lilv_array[35][2][10] = 0.0459;//公积金 5-30年 4.59%
		//2008年	10月30日新利率(第二套房)
		lilv_array[36] = new Array;
		lilv_array[36][1] = new Array;
		lilv_array[36][2] = new Array;
		lilv_array[36][1][5] = 0.0772;//商贷 1～5年 7.72%
		lilv_array[36][1][10] = 0.0792;//商贷 5-30年 7.92%
		lilv_array[36][2][5] = 0.0405;//公积金 1～5年 4.05%
		lilv_array[36][2][10] = 0.0459;//公积金 5-30年 4.59%
		//2008年	11月27日新利率下限
		lilv_array[37] = new Array;
		lilv_array[37][1] = new Array;
		lilv_array[37][2] = new Array;
		lilv_array[37][1][5] = 0.0416;//商贷 1～5年 4.16%
		lilv_array[37][1][10] = 0.0428;//商贷 5-30年 4.28%
		lilv_array[37][2][5] = 0.0351;//公积金 1～5年 3.51%
		lilv_array[37][2][10] = 0.0405;//公积金 5-30年 4.05%
		//2008年	11月27日新利率上限
		lilv_array[38] = new Array;
		lilv_array[38][1] = new Array;
		lilv_array[38][2] = new Array;
		lilv_array[38][1][5] = 0.0653;//商贷 1～5年 6.53%
		lilv_array[38][1][10] = 0.0673;//商贷 5-30年 6.73%
		lilv_array[38][2][5] = 0.0351;//公积金 1～5年 3.51%
		lilv_array[38][2][10] = 0.0405;//公积金 5-30年 4.05%
		//2008年	11月27日新利率基准
		lilv_array[39] = new Array;
		lilv_array[39][1] = new Array;
		lilv_array[39][2] = new Array;
		lilv_array[39][1][5] = 0.0594;//商贷 1～5年 5.94%
		lilv_array[39][1][10] = 0.0612;//商贷 5-30年 6.12%
		lilv_array[39][2][5] = 0.0351;//公积金 1～5年 3.51%
		lilv_array[39][2][10] = 0.0405;//公积金 5-30年 4.05%
		//2008年	11月27日新利率(第二套房)
		lilv_array[40] = new Array;
		lilv_array[40][1] = new Array;
		lilv_array[40][2] = new Array;
		lilv_array[40][1][5] = 0.0653;//商贷 1～5年 6.53%
		lilv_array[40][1][10] = 0.0673;//商贷 5-30年 6.73%
		lilv_array[40][2][5] = 0.0351;//公积金 1～5年 3.51%
		lilv_array[40][2][10] = 0.0405;//公积金 5-30年 4.05%
		//2008年	12月23日新利率下限(7折)
		lilv_array[41] = new Array;
		lilv_array[41][1] = new Array;
		lilv_array[41][2] = new Array;
		lilv_array[41][1][5] = 0.0403;//商贷 1～5年 4.03%
		lilv_array[41][1][10] = 0.0416;//商贷 5-30年 4.16%
		lilv_array[41][2][5] = 0.0333;//公积金 1～5年 3.33%
		lilv_array[41][2][10] = 0.0387;//公积金 5-30年 3.87%
		//2008年	12月23日新利率下限(85折)
		lilv_array[42] = new Array;
		lilv_array[42][1] = new Array;
		lilv_array[42][2] = new Array;
		lilv_array[42][1][5] = 0.0490;//商贷 1～5年 4.90%
		lilv_array[42][1][10] = 0.0505;//商贷 5-30年 5.05%
		lilv_array[42][2][5] = 0.0333;//公积金 1～5年 3.33%
		lilv_array[42][2][10] = 0.0387;//公积金 5-30年 3.87%
		//2008年	12月23日新利率上限(1.1倍)
		lilv_array[43] = new Array;
		lilv_array[43][1] = new Array;
		lilv_array[43][2] = new Array;
		lilv_array[43][1][5] = 0.0634;//商贷 1～5年 6.34%
		lilv_array[43][1][10] = 0.0653;//商贷 5-30年 6.53%
		lilv_array[43][2][5] = 0.0333;//公积金 1～5年 3.33%
		lilv_array[43][2][10] = 0.0387;//公积金 5-30年 3.87%
		//2008年	12月23日新利率基准
		lilv_array[44] = new Array;
		lilv_array[44][1] = new Array;
		lilv_array[44][2] = new Array;
		lilv_array[44][1][5] = 0.0576;//商贷 1～5年 5.76%
		lilv_array[44][1][10] = 0.0594;//商贷 5-30年 5.94%
		lilv_array[44][2][5] = 0.0333;//公积金 1～5年 3.33%
		lilv_array[44][2][10] = 0.0387;//公积金 5-30年 3.87%
		//2008年	12月23日新利率(第二套房)(1.1倍)
		lilv_array[45] = new Array;
		lilv_array[45][1] = new Array;
		lilv_array[45][2] = new Array;
		lilv_array[45][1][5] = 0.0634;//商贷 1～5年 6.34%
		lilv_array[45][1][10] = 0.0653;//商贷 5-30年 6.53%
		lilv_array[45][2][5] = 0.0333;//公积金 1～5年 3.33%
		lilv_array[45][2][10] = 0.0387;//公积金 5-30年 3.87%
		//2010年	10月20日新利率下限(85折)
		lilv_array[46] = new Array;
		lilv_array[46][1] = new Array;
		lilv_array[46][2] = new Array;
		lilv_array[46][1][5] = 0.0596 * 0.85;//商贷 1～5年 5.96%
		lilv_array[46][1][10] = 0.0614 * 0.85;//商贷 5-30年 6.14%
		lilv_array[46][2][5] = 0.0350;//公积金 1～5年 3.50%
		lilv_array[46][2][10] = 0.0405;//公积金 5-30年 4.05%
		//2010年	10月20日新利率基准
		lilv_array[47] = new Array;
		lilv_array[47][1] = new Array;
		lilv_array[47][2] = new Array;
		lilv_array[47][1][5] = 0.0596;//商贷 1～5年 5.96%
		lilv_array[47][1][10] = 0.0614;//商贷 5-30年 6.14%
		lilv_array[47][2][5] = 0.0350;//公积金 1～5年 3.50%
		lilv_array[47][2][10] = 0.0405;//公积金 5-30年 4.05%
		//2010年	10月20日新利率上限(1.1倍)
		lilv_array[48] = new Array;
		lilv_array[48][1] = new Array;
		lilv_array[48][2] = new Array;
		lilv_array[48][1][5] = 0.0596 * 1.1;//商贷 1～5年 5.96%
		lilv_array[48][1][10] = 0.0614 * 1.1;//商贷 5-30年 6.14%
		lilv_array[48][2][5] = 0.0350;//公积金 1～5年 3.50%
		lilv_array[48][2][10] = 0.0405;//公积金 5-30年 4.05%
		//2010年	10月20日新利率下限(85折)
		lilv_array[49] = new Array;
		lilv_array[49][1] = new Array;
		lilv_array[49][2] = new Array;
		lilv_array[49][1][5] = 0.0622 * 0.85;//商贷 1～5年 5.96%
		lilv_array[49][1][10] = 0.0640 * 0.85;//商贷 5-30年 6.14%
		lilv_array[49][2][5] = 0.0375;//公积金 1～5年 3.50%
		lilv_array[49][2][10] = 0.0430;//公积金 5-30年 4.05%
		//2010年	10月20日新利率基准
		lilv_array[50] = new Array;
		lilv_array[50][1] = new Array;
		lilv_array[50][2] = new Array;
		lilv_array[50][1][5] = 0.0622;//商贷 1～5年 5.96%
		lilv_array[50][1][10] = 0.0640;//商贷 5-30年 6.14%
		lilv_array[50][2][5] = 0.0375;//公积金 1～5年 3.50%
		lilv_array[50][2][10] = 0.0430;//公积金 5-30年 4.05%
		//2010年	10月20日新利率上限(1.1倍)
		lilv_array[51] = new Array;
		lilv_array[51][1] = new Array;
		lilv_array[51][2] = new Array;
		lilv_array[51][1][5] = 0.0622 * 1.1;//商贷 1～5年 5.96%
		lilv_array[51][1][10] = 0.0640 * 1.1;//商贷 5-30年 6.14%
		lilv_array[51][2][5] = 0.0375;//公积金 1～5年 3.50%
		lilv_array[51][2][10] = 0.0430;//公积金 5-30年 4.05%
		//2011年02月09日新利率下限(85折)
		lilv_array[52] = new Array;
		lilv_array[52][1] = new Array;
		lilv_array[52][2] = new Array;
		lilv_array[52][1][1] = 0.0606 * 0.85;//商贷 1年 6.06%
		lilv_array[52][1][3] = 0.0610 * 0.85;//商贷 1-3年 6.10%
		lilv_array[52][1][5] = 0.0645 * 0.85;//商贷 3-5年 6.45%
		lilv_array[52][1][10] = 0.0660 * 0.85;//商贷 >5年 6.60%
		lilv_array[52][2][5] = 0.0375;//公积金 1～5年 3.50%
		lilv_array[52][2][10] = 0.0430;//公积金 5-30年 4.05%
		//2011年02月09日新利率基准
		lilv_array[53] = new Array;
		lilv_array[53][1] = new Array;
		lilv_array[53][2] = new Array;
		lilv_array[53][1][1] = 0.0606;//商贷 1年 6.06%
		lilv_array[53][1][3] = 0.0610;//商贷 1-3年 6.10%
		lilv_array[53][1][5] = 0.0645;//商贷 3-5年 6.45%
		lilv_array[53][1][10] = 0.0660;//商贷 >5年 6.60%
		lilv_array[53][2][5] = 0.0375;//公积金 1～5年 3.50%
		lilv_array[53][2][10] = 0.0430;//公积金 5-30年 4.05%
		//2011年02月09日新利率上限(1.1倍)
		lilv_array[54] = new Array;
		lilv_array[54][1] = new Array;
		lilv_array[54][2] = new Array;
		lilv_array[54][1][1] = 0.0606 * 1.1;//商贷 1年 6.06%
		lilv_array[54][1][3] = 0.0610 * 1.1;//商贷 1-3年 6.10%
		lilv_array[54][1][5] = 0.0645 * 1.1;//商贷 3-5年 6.45%
		lilv_array[54][1][10] = 0.0660 * 1.1;//商贷 >5年 6.60%
		lilv_array[54][2][5] = 0.0375;//公积金 1～5年 3.50%
		lilv_array[54][2][10] = 0.0430;//公积金 5-30年 4.05%
		
		//2011年04月06日新利率下限(85折)
		lilv_array[55] = new Array;
		lilv_array[55][1] = new Array;
		lilv_array[55][2] = new Array;
		lilv_array[55][1][1] = 0.0631 * 0.85;//商贷 1年 6.06%
		lilv_array[55][1][3] = 0.0640 * 0.85;//商贷 1-3年 6.10%
		lilv_array[55][1][5] = 0.0665 * 0.85;//商贷 3-5年 6.45%
		lilv_array[55][1][10] = 0.0680 * 0.85;//商贷 >5年 6.60%
		lilv_array[55][2][5] = 0.0420;//公积金 1～5年 3.50%
		lilv_array[55][2][10] = 0.0470;//公积金 5-30年 4.05%
		//2011年04月06日新利率基准
		lilv_array[56] = new Array;
		lilv_array[56][1] = new Array;
		lilv_array[56][2] = new Array;
		lilv_array[56][1][1] = 0.0631;//商贷 1年 6.06%
		lilv_array[56][1][3] = 0.0640;//商贷 1-3年 6.10%
		lilv_array[56][1][5] = 0.0665;//商贷 3-5年 6.45%
		lilv_array[56][1][10] = 0.0680;//商贷 >5年 6.60%
		lilv_array[56][2][5] = 0.0420;//公积金 1～5年 3.50%
		lilv_array[56][2][10] = 0.0470;//公积金 5-30年 4.05%
		//2011年04月06日新利率上限(1.1倍)
		lilv_array[57] = new Array;
		lilv_array[57][1] = new Array;
		lilv_array[57][2] = new Array;
		lilv_array[57][1][1] = 0.0631 * 1.1;//商贷 1年 6.06%
		lilv_array[57][1][3] = 0.0640 * 1.1;//商贷 1-3年 6.10%
		lilv_array[57][1][5] = 0.0665 * 1.1;//商贷 3-5年 6.45%
		lilv_array[57][1][10] = 0.0680 * 1.1;//商贷 >5年 6.60%
		lilv_array[57][2][5] = 0.0420;//公积金 1～5年 3.50%
		lilv_array[57][2][10] = 0.0470;//公积金 5-30年 4.05%
		
		
		//2011年07月07日新利率下限(85折)
		lilv_array[58] = new Array;
		lilv_array[58][1] = new Array;
		lilv_array[58][2] = new Array;
		lilv_array[58][1][1] = 0.0656 * 0.85;//商贷 1年 6.06%
		lilv_array[58][1][3] = 0.0665 * 0.85;//商贷 1-3年 6.10%
		lilv_array[58][1][5] = 0.0690 * 0.85;//商贷 3-5年 6.45%
		lilv_array[58][1][10] = 0.0705 * 0.85;//商贷 >5年 6.60%
		lilv_array[58][2][5] = 0.0445;//公积金 1～5年 3.50%
		lilv_array[58][2][10] = 0.0490;//公积金 5-30年 4.05%
		//2011年07月07日新利率基准
		lilv_array[59] = new Array;
		lilv_array[59][1] = new Array;
		lilv_array[59][2] = new Array;
		lilv_array[59][1][1] = 0.0656;//商贷 1年 6.06%
		lilv_array[59][1][3] = 0.0665;//商贷 1-3年 6.10%
		lilv_array[59][1][5] = 0.0690;//商贷 3-5年 6.45%
		lilv_array[59][1][10] = 0.0705;//商贷 >5年 6.60%
		lilv_array[59][2][5] = 0.0445;//公积金 1～5年 3.50%
		lilv_array[59][2][10] = 0.0490;//公积金 5-30年 4.05%
		//2011年07月07日新利率上限(1.1倍)
		lilv_array[60] = new Array;
		lilv_array[60][1] = new Array;
		lilv_array[60][2] = new Array;
		lilv_array[60][1][1] = 0.0656 * 1.1;//商贷 1年 6.06%
		lilv_array[60][1][3] = 0.0665 * 1.1;//商贷 1-3年 6.10%
		lilv_array[60][1][5] = 0.0690 * 1.1;//商贷 3-5年 6.45%
		lilv_array[60][1][10] = 0.0705 * 1.1;//商贷 >5年 6.60%
		lilv_array[60][2][5] = 0.0445;//公积金 1～5年 3.50%
		lilv_array[60][2][10] = 0.0490;//公积金 5-30年 4.05%
		
		//2012年06月08日新利率下限(85折)
		lilv_array[61] = new Array;
		lilv_array[61][1] = new Array;
		lilv_array[61][2] = new Array;
		lilv_array[61][1][1] = 0.0640 * 0.85;//商贷 1年 6.06%
		lilv_array[61][1][3] = 0.0640 * 0.85;//商贷 1-3年 6.10%
		lilv_array[61][1][5] = 0.0665 * 0.85;//商贷 3-5年 6.45%
		lilv_array[61][1][10] = 0.0680 * 0.85;//商贷 >5年 6.60%
		lilv_array[61][2][5] = 0.0420;//公积金 1～5年 3.50%
		lilv_array[61][2][10] = 0.0470;//公积金 5-30年 4.05%
		//2012年06月08日新利率基准
		lilv_array[62] = new Array;
		lilv_array[62][1] = new Array;
		lilv_array[62][2] = new Array;
		lilv_array[62][1][1] = 0.0640;//商贷 1年 6.06%
		lilv_array[62][1][3] = 0.0640;//商贷 1-3年 6.10%
		lilv_array[62][1][5] = 0.0665;//商贷 3-5年 6.45%
		lilv_array[62][1][10] = 0.0680;//商贷 >5年 6.60%
		lilv_array[62][2][5] = 0.0420;//公积金 1～5年 3.50%
		lilv_array[62][2][10] = 0.0470;//公积金 5-30年 4.05%
		//2012年06月08日新利率上限(1.1倍)
		lilv_array[63] = new Array;
		lilv_array[63][1] = new Array;
		lilv_array[63][2] = new Array;
		lilv_array[63][1][1] = 0.0640 * 1.1;//商贷 1年 6.06%
		lilv_array[63][1][3] = 0.0640 * 1.1;//商贷 1-3年 6.10%
		lilv_array[63][1][5] = 0.0665 * 1.1;//商贷 3-5年 6.45%
		lilv_array[63][1][10] = 0.0680 * 1.1;//商贷 >5年 6.60%
		lilv_array[63][2][5] = 0.0420;//公积金 1～5年 3.50%
		lilv_array[63][2][10] = 0.0470;//公积金 5-30年 4.05%
		
		
		//得到利率
		function getlilv(lilv_class, type, years){
		    var lilv_class = parseInt(lilv_class);
		    /*
		    if (years <= 5) {
		        return lilv_array[lilv_class][type][5];
		    }
		    else {
		        return lilv_array[lilv_class][type][10];
		    }
		    */
		    if(lilv_class >= 52 && type == 1){
		        if(years == 1){
		            return lilv_array[lilv_class][type][1];
		        }
		        if(years > 1 && years <= 3){
		            return lilv_array[lilv_class][type][3];
		        }
		        if(years > 3 && years <= 5){
		            return lilv_array[lilv_class][type][5];
		        }
		        if(years > 5){
		            return lilv_array[lilv_class][type][10];
		        }
		    }else{
		        if (years <= 5) {
		            return lilv_array[lilv_class][type][5];
		        }
		        else {
		            return lilv_array[lilv_class][type][10];
		        }
		    }
		}
		//提前还款计算
		function play() {
		    var showErrorMessage = function (element, message, showRedBorder) {
		        if (showRedBorder == undefined) { showRedBorder = true;}
		
		        var msgElement = $(element).parent().find('span.errorMsg');
		        if (msgElement && msgElement.length > 0) {
		            msgElement.text(message);
		        }
		        else {
		            var span = document.createElement('span');
		            span.className = 'errorMsg';
		            span.innerText = message;
		            element.parentNode.appendChild(span)
		        }
		        if (showRedBorder) {
		            $(element).css({ "border-color": "red" });
		        }
		        $(element).focus();
		    };
		
		    var clearErrorMessage = function (element) {
		        //$(element).css({ "border-color": "#b4b9bd" });
		        var msgElement = $(element).parent().find('span.errorMsg');
		        msgElement.text('');
		    };
		
		    var dkzys;
		    var checkLoanCount = function () {
		        if (document.tqhdjsq.dkzws.value == '') {
		            showErrorMessage(document.tqhdjsq.dkzws, '请填入贷款总额');
		            return false;
		        }
		        else if (isNaN(document.tqhdjsq.dkzws.value) || document.tqhdjsq.dkzws.value <= 0) {
		            showErrorMessage(document.tqhdjsq.dkzws, '请填入正确的贷款总额');
		            return false;
		        }
		        else {
		            dkzys = parseFloat(document.tqhdjsq.dkzws.value) * 10000;
		            clearErrorMessage(document.tqhdjsq.dkzws);
		            return true;
		        }
		    };
		
		    if(!checkLoanCount()){
		        return false;
		    }
		    
		    
		    if (document.tqhdjsq.tqhkfs[1].checked ) {
		        if (document.tqhdjsq.tqhkws.value == '') {
		            showErrorMessage(document.tqhdjsq.tqhkws, '请填入部分提前还款额度');
		            return false;
		        }
		        else if (isNaN(document.tqhdjsq.tqhkws.value) || document.tqhdjsq.tqhkws.value <= 0) {
		            showErrorMessage(document.tqhdjsq.tqhkws, '部分提前还款额度必须为数字');
		            return false;
		        }
		        else {
		            clearErrorMessage(document.tqhdjsq.tqhkws);
		        }
		    }
		    else {
		        clearErrorMessage(document.tqhdjsq.tqhkws);
		    }
		    s_yhkqs = parseInt(document.tqhdjsq.yhkqs.value);
		    
		    //月利率
		    
		    if (document.tqhdjsq.dklx[0].checked) {
		        if (s_yhkqs > 60) {
		            dklv = getlilv(document.tqhdjsq.dklv_class.value, 2, 10) / 12; //公积金贷款利率5年以上4.23%
		        }
		        else {
		            dklv = getlilv(document.tqhdjsq.dklv_class.value, 2, 3) / 12; //公积金贷款利率5年(含)以下3.78%
		        }
		    }
		    if (document.tqhdjsq.dklx[1].checked) {
		        if (s_yhkqs > 60) {
		            dklv = getlilv(document.tqhdjsq.dklv_class.value, 1, 10) / 12; //商业性贷款利率5年以上5.31%
		        }
		        else {
		            dklv = getlilv(document.tqhdjsq.dklv_class.value, 1, 3) / 12; //商业性贷款利率5年(含)以下4.95%
		        }
		    }
		    
		    //已还贷款期数
		    yhdkqs = (parseInt(document.tqhdjsq.tqhksjn.value) * 12 + parseInt(document.tqhdjsq.tqhksjy.value)) - (parseInt(document.tqhdjsq.yhksjn.value) * 12 + parseInt(document.tqhdjsq.yhksjy.value));
		    
		    if (yhdkqs < 0 || yhdkqs > s_yhkqs) {
		        showErrorMessage(document.tqhdjsq.tqhksjn,'预计提前还款时间与第一次还款时间有矛盾，请查实', false);
		        return false;
		    }
		    else {
		        clearErrorMessage(document.tqhdjsq.tqhksjn);
		    }
		    
		    yhk = dkzys * (dklv * Math.pow((1 + dklv), s_yhkqs)) / (Math.pow((1 + dklv), s_yhkqs) - 1);
		    yhkjssj = Math.floor((parseInt(document.tqhdjsq.yhksjn.value) * 12 + parseInt(document.tqhdjsq.yhksjy.value) + s_yhkqs - 2) / 12) + '年' + ((parseInt(document.tqhdjsq.yhksjn.value) * 12 + parseInt(document.tqhdjsq.yhksjy.value) + s_yhkqs - 2) % 12 + 1) + '月';
		    yhdkys = yhk * yhdkqs;
		    
		    yhlxs = 0;
		    yhbjs = 0;
		    for (i = 1; i <= yhdkqs; i++) {
		        yhlxs = yhlxs + (dkzys - yhbjs) * dklv;
		        yhbjs = yhbjs + yhk - (dkzys - yhbjs) * dklv;
		    }
		    
		    remark = '';
		    if (document.tqhdjsq.tqhkfs[1].checked) {
		        tqhkys = parseInt(document.tqhdjsq.tqhkws.value) * 10000;
		        if (tqhkys + yhk >= (dkzys - yhbjs) * (1 + dklv)) {
		            remark = '您的提前还款额已足够还清所欠贷款！';
		        }
		        else {
		            yhbjs = yhbjs + yhk;
		            byhk = yhk + tqhkys;
		            if (document.tqhdjsq.clfs[0].checked) {
		                yhbjs_temp = yhbjs + tqhkys;
		                for (xdkqs = 0; yhbjs_temp <= dkzys; xdkqs++) 
		                    yhbjs_temp = yhbjs_temp + yhk - (dkzys - yhbjs_temp) * dklv;
		                xdkqs = xdkqs - 1;
		                xyhk = (dkzys - yhbjs - tqhkys) * (dklv * Math.pow((1 + dklv), xdkqs)) / (Math.pow((1 + dklv), xdkqs) - 1);
		                jslx = yhk * s_yhkqs - yhdkys - byhk - xyhk * xdkqs;
		                xdkjssj = Math.floor((parseInt(document.tqhdjsq.tqhksjn.value) * 12 + parseInt(document.tqhdjsq.tqhksjy.value) + xdkqs - 2) / 12) + '年' + ((parseInt(document.tqhdjsq.tqhksjn.value) * 12 + parseInt(document.tqhdjsq.tqhksjy.value) + xdkqs - 2) % 12 + 1) + '月';
		            }
		            else {
		                xyhk = (dkzys - yhbjs - tqhkys) * (dklv * Math.pow((1 + dklv), (s_yhkqs - yhdkqs))) / (Math.pow((1 + dklv), (s_yhkqs - yhdkqs)) - 1);
		                jslx = yhk * s_yhkqs - yhdkys - byhk - xyhk * (s_yhkqs - yhdkqs);
		                xdkjssj = yhkjssj;
		            }
		        }
		    }
		    
		    if (document.tqhdjsq.tqhkfs[0].checked || remark != '') {
		        byhk = (dkzys - yhbjs) * (1 + dklv);
		        xyhk = 0;
		        jslx = yhk * s_yhkqs - yhdkys - byhk;
		        xdkjssj = document.tqhdjsq.tqhksjn.value + '年' + document.tqhdjsq.tqhksjy.value + '月';
		    }
		    
		    document.tqhdjsq.ykhke.value = Math.round(yhk * 100) / 100;
		    document.tqhdjsq.yhkze.value = Math.round(yhdkys * 100) / 100;
		    document.tqhdjsq.yhlxe.value = Math.round(yhlxs * 100) / 100;
		    document.tqhdjsq.gyyihke.value = Math.round(byhk * 100) / 100;
		    document.tqhdjsq.xyqyhke.value = Math.round(xyhk * 100) / 100;
		    document.tqhdjsq.jslxzc.value = Math.round(jslx * 100) / 100;
		    document.tqhdjsq.yzhhkq.value = yhkjssj;
		    document.tqhdjsq.xdzhhkq.value = xdkjssj;
		    document.tqhdjsq.jsjgts.value = remark;
		}