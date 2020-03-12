/**
	************************************************************
	************************************************************
	************************************************************
	*	�ļ����� 	adc.c
	*
	*	���ߣ� 		�ż���
	*
	*	���ڣ� 		2017-04-06
	*
	*	�汾�� 		V1.0
	*
	*	˵���� 		ADC��ʼ��������
	*
	*	�޸ļ�¼��	
	************************************************************
	************************************************************
	************************************************************
**/

//Ӳ������
#include "adc.h"
#include "delay.h"


/*
************************************************************
*	�������ƣ�	ADCx_Init
*
*	�������ܣ�	ADCx��ʼ��
*
*	��ڲ�����	ADCx��ADC�豸
*				tempFlag��1-�����ڲ��¶Ȳ���	0-�������ڲ��¶Ȳ���
*
*	���ز�����	��
*
*	˵����		ֻ��ADC1�����ڲ��¶Ȳ�������
*				��Ҫ����Ҫ���г�ʼ����Ӧ��GPIO��������
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
	
	RCC_ADCCLKConfig(RCC_PCLK2_Div6);									//����ADC��Ƶ����6 72M/6=12,ADC���ʱ�䲻�ܳ���14M
	
	ADC_DeInit(ADCx);													//��λADCx,������ ADCx ��ȫ���Ĵ�������Ϊȱʡֵ
	
	adc_initstruct.ADC_ContinuousConvMode = DISABLE;						//ģ��ת�������ڵ���ת��ģʽ
	adc_initstruct.ADC_DataAlign = ADC_DataAlign_Right;					//ADC�����Ҷ���
	adc_initstruct.ADC_ExternalTrigConv = ADC_ExternalTrigConv_None;		//ת��������������ⲿ��������
	adc_initstruct.ADC_Mode = ADC_Mode_Independent;						//ADC����ģʽ:ADC1��ADC2�����ڶ���ģʽ
	adc_initstruct.ADC_NbrOfChannel = 1;									//˳����й���ת����ADCͨ������Ŀ
	adc_initstruct.ADC_ScanConvMode = DISABLE;							//ģ��ת�������ڵ�ͨ��ģʽ
	ADC_Init(ADCx, &adc_initstruct);										//����adcInitStruct��ָ���Ĳ�����ʼ������ADCx�ļĴ���
	
	if(ADCx == ADC1 && tempFlag)
		ADC_TempSensorVrefintCmd(ENABLE);								//�����ڲ��¶ȴ�����//ADC1ͨ��16
	
	ADC_Cmd(ADCx, ENABLE);												//ʹ��ָ����ADC1
	
	ADC_ResetCalibration(ADCx);											//ʹ�ܸ�λУ׼  
	 
	while(ADC_GetResetCalibrationStatus(ADCx));							//�ȴ���λУ׼����
	
	ADC_StartCalibration(ADCx);											//����ADУ׼
 
	while(ADC_GetCalibrationStatus(ADCx));								//�ȴ�У׼����

}

/*
************************************************************
*	�������ƣ�	ADCx_GetValue
*
*	�������ܣ�	��ȡһ��ADCx��ֵ
*
*	��ڲ�����	ADCx��ADC�豸
*				ch��ͨ��
*
*	���ز�����	ADCxת�����������
*
*	˵����		ADC_Channel_1~ADC_Channel_16
************************************************************
*/
unsigned short ADCx_GetValue(ADC_TypeDef *ADCx, unsigned char ch)
{

	//����ָ��ADC�Ĺ�����ͨ����һ�����У�����ʱ��
	ADC_RegularChannelConfig(ADCx, ch, 1, ADC_SampleTime_239Cycles5 );	//ADC1,ADCͨ��,����ʱ��Ϊ239.5����	  			    
  
	ADC_SoftwareStartConvCmd(ADCx, ENABLE);								//ʹ��ָ����ADC1�����ת����������
	 
	while(!ADC_GetFlagStatus(ADCx, ADC_FLAG_EOC ));						//�ȴ�ת������

	return ADC_GetConversionValue(ADCx);								//�������һ��ADC1�������ת�����

}

/*
************************************************************
*	�������ƣ�	ADCx_GetValueTimes
*
*	�������ܣ�	��ȡ���ADCx��ֵ������ƽ��ֵ
*
*	��ڲ�����	ADCx��ADC�豸
*				ch��ͨ��
*				times������
*
*	���ز�����	��ѹƽ��ֵ
*
*	˵����		ADC_Channel_1~ADC_Channel_16
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
*	�������ƣ�	ADCx_GetVoltag
*
*	�������ܣ�	��ȡ���ADCx�ĵ�ѹֵ
*
*	��ڲ�����	ADCx��ADC�豸
*				ch��ͨ��
*				times������
*
*	���ز�����	��ѹֵ
*
*	˵����		ADC_Channel_1~ADC_Channel_16
************************************************************
*/
float ADCx_GetVoltag(ADC_TypeDef *ADCx, unsigned char ch, unsigned char times)
{

	unsigned short voltag = ADCx_GetValueTimes(ADCx, ch, times);
	
	return (float)voltag / 4096 * 3.3;

}

/*
************************************************************
*	�������ƣ�	ADC1_GetTemperature
*
*	�������ܣ�	��ȡADCͨ�����ڲ��¶�ֵ
*
*	��ڲ�����	��
*
*	���ز�����	�¶�ֵ
*
*	˵����		
************************************************************
*/
float ADC1_GetTemperature(void)
{

	float temp = ADCx_GetValueTimes(ADC1, ADC_Channel_16, 10); //��ȡԭʼAD����
	
	temp = temp * 3.3 / 4096; //ת��Ϊ��ѹֵ
	
	return (1.43 - temp) / 0.0043 + 25; //�������ǰ�¶�ֵ

}
