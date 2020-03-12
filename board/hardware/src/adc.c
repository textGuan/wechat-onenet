/**
	************************************************************
	************************************************************
	************************************************************
	*	文件名： 	adc.c
	*
	*	作者： 		张继瑞
	*
	*	日期： 		2017-04-06
	*
	*	版本： 		V1.0
	*
	*	说明： 		ADC初始化、驱动
	*
	*	修改记录：	
	************************************************************
	************************************************************
	************************************************************
**/

//硬件驱动
#include "adc.h"
#include "delay.h"


/*
************************************************************
*	函数名称：	ADCx_Init
*
*	函数功能：	ADCx初始化
*
*	入口参数：	ADCx：ADC设备
*				tempFlag：1-启用内部温度测量	0-不启用内部温度测量
*
*	返回参数：	无
*
*	说明：		只有ADC1具有内部温度测量功能
*				重要：需要自行初始化对应的GPIO！！！！
************************************************************
*/
void ADCx_Init(ADC_TypeDef *ADCx, _Bool tempFlag)
{

	ADC_InitTypeDef adc_initstruct;
	
	if(ADCx == ADC1)
		RCC_APB2PeriphClockCmd(RCC_APB2Periph_ADC1, ENABLE);
	else if(ADCx == ADC2)
		RCC_APB2PeriphClockCmd(RCC_APB2Periph_ADC2, ENABLE);
	else
		RCC_APB2PeriphClockCmd(RCC_APB2Periph_ADC3, ENABLE);
	
	RCC_ADCCLKConfig(RCC_PCLK2_Div6);									//设置ADC分频因子6 72M/6=12,ADC最大时间不能超过14M
	
	ADC_DeInit(ADCx);													//复位ADCx,将外设 ADCx 的全部寄存器重设为缺省值
	
	adc_initstruct.ADC_ContinuousConvMode = DISABLE;						//模数转换工作在单次转换模式
	adc_initstruct.ADC_DataAlign = ADC_DataAlign_Right;					//ADC数据右对齐
	adc_initstruct.ADC_ExternalTrigConv = ADC_ExternalTrigConv_None;		//转换由软件而不是外部触发启动
	adc_initstruct.ADC_Mode = ADC_Mode_Independent;						//ADC工作模式:ADC1和ADC2工作在独立模式
	adc_initstruct.ADC_NbrOfChannel = 1;									//顺序进行规则转换的ADC通道的数目
	adc_initstruct.ADC_ScanConvMode = DISABLE;							//模数转换工作在单通道模式
	ADC_Init(ADCx, &adc_initstruct);										//根据adcInitStruct中指定的参数初始化外设ADCx的寄存器
	
	if(ADCx == ADC1 && tempFlag)
		ADC_TempSensorVrefintCmd(ENABLE);								//开启内部温度传感器//ADC1通道16
	
	ADC_Cmd(ADCx, ENABLE);												//使能指定的ADC1
	
	ADC_ResetCalibration(ADCx);											//使能复位校准  
	 
	while(ADC_GetResetCalibrationStatus(ADCx));							//等待复位校准结束
	
	ADC_StartCalibration(ADCx);											//开启AD校准
 
	while(ADC_GetCalibrationStatus(ADCx));								//等待校准结束

}

/*
************************************************************
*	函数名称：	ADCx_GetValue
*
*	函数功能：	获取一次ADCx的值
*
*	入口参数：	ADCx：ADC设备
*				ch：通道
*
*	返回参数：	ADCx转换后的数字量
*
*	说明：		ADC_Channel_1~ADC_Channel_16
************************************************************
*/
unsigned short ADCx_GetValue(ADC_TypeDef *ADCx, unsigned char ch)
{

	//设置指定ADC的规则组通道，一个序列，采样时间
	ADC_RegularChannelConfig(ADCx, ch, 1, ADC_SampleTime_239Cycles5 );	//ADC1,ADC通道,采样时间为239.5周期	  			    
  
	ADC_SoftwareStartConvCmd(ADCx, ENABLE);								//使能指定的ADC1的软件转换启动功能
	 
	while(!ADC_GetFlagStatus(ADCx, ADC_FLAG_EOC ));						//等待转换结束

	return ADC_GetConversionValue(ADCx);								//返回最近一次ADC1规则组的转换结果

}

/*
************************************************************
*	函数名称：	ADCx_GetValueTimes
*
*	函数功能：	获取多次ADCx的值，并求平均值
*
*	入口参数：	ADCx：ADC设备
*				ch：通道
*				times：次数
*
*	返回参数：	电压平均值
*
*	说明：		ADC_Channel_1~ADC_Channel_16
************************************************************
*/
unsigned short ADCx_GetValueTimes(ADC_TypeDef *ADCx, unsigned char ch, unsigned char times)
{

	float adcValue = 0;
	unsigned char i = 0;
	
	for(; i < times; i++)
	{
		adcValue += (float)ADCx_GetValue(ADCx, ch);
		DelayXms(5);
	}
	
	return (unsigned short)(adcValue / times);

}

/*
************************************************************
*	函数名称：	ADCx_GetVoltag
*
*	函数功能：	获取多次ADCx的电压值
*
*	入口参数：	ADCx：ADC设备
*				ch：通道
*				times：次数
*
*	返回参数：	电压值
*
*	说明：		ADC_Channel_1~ADC_Channel_16
************************************************************
*/
float ADCx_GetVoltag(ADC_TypeDef *ADCx, unsigned char ch, unsigned char times)
{

	unsigned short voltag = ADCx_GetValueTimes(ADCx, ch, times);
	
	return (float)voltag / 4096 * 3.3;

}

/*
************************************************************
*	函数名称：	ADC1_GetTemperature
*
*	函数功能：	获取ADC通道的内部温度值
*
*	入口参数：	无
*
*	返回参数：	温度值
*
*	说明：		
************************************************************
*/
float ADC1_GetTemperature(void)
{

	float temp = ADCx_GetValueTimes(ADC1, ADC_Channel_16, 10); //获取原始AD数据
	
	temp = temp * 3.3 / 4096; //转换为电压值
	
	return (1.43 - temp) / 0.0043 + 25; //计算出当前温度值

}
