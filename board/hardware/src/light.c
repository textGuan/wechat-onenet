/**
	************************************************************
	************************************************************
	************************************************************
	*	文件名： 	light.c
	*
	*	作者： 		张继瑞
	*
	*	日期： 		2017-04-06
	*
	*	版本： 		V1.0
	*
	*	说明： 		光敏电阻
	*
	*	修改记录：	
	************************************************************
	************************************************************
	************************************************************
**/

//单片机头文件
#include "stm32f10x.h"

//硬件驱动
#include "light.h"
#include "adc.h"


LIGHT_INFO light_info;


/*
************************************************************
*	函数名称：	LIGHT_Init
*
*	函数功能：	光敏电阻初始化
*
*	入口参数：	无
*
*	返回参数：	无
*
*	说明：		
************************************************************
*/
void LIGHT_Init(void)
{

	GPIO_InitTypeDef gpio_initstruct;
	
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOC, ENABLE);
	
	gpio_initstruct.GPIO_Mode = GPIO_Mode_AIN;
	gpio_initstruct.GPIO_Pin = GPIO_Pin_3;
	gpio_initstruct.GPIO_Speed = GPIO_Speed_50MHz;
	
	GPIO_Init(GPIOC, &gpio_initstruct);
	
	ADCx_Init(ADC1, 0);

}

/*
************************************************************
*	函数名称：	LIGHT_GetVoltag
*
*	函数功能：	获取光敏电阻
*
*	入口参数：	无
*
*	返回参数：	无
*
*	说明：		
************************************************************
*/
void LIGHT_GetVoltag(void)
{

	light_info.voltag = ADCx_GetVoltag(ADC1, ADC_Channel_13, 10);

}
