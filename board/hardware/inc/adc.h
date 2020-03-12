#ifndef _ADC_H_
#define _ADC_H_


#include "stm32f10x.h"


void ADCx_Init(ADC_TypeDef *ADCx, _Bool tempFlag);

unsigned short ADCx_GetValue(ADC_TypeDef *ADCx, unsigned char ch);

unsigned short ADCx_GetValueTimes(ADC_TypeDef *ADCx, unsigned char ch, unsigned char times);

float ADCx_GetVoltag(ADC_TypeDef *ADCx, unsigned char ch, unsigned char times);

float ADC1_GetTemperature(void);


#endif
