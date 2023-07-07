import json
import boto3
import logging
from custom_encoder import CustomEncoder

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodbTableName = 'plants'
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(dynamodbTableName)

getMethod = 'GET'
postMethod = 'POST'
patchMethod = 'PATCH'
deleteMethod = 'DELETE'
healthPath = '/health'
plantPath = '/plant'
plantsPath = '/plants'


def lambda_handler(event, context):
    # log the request event to see what it looks like
    logger.info(event)
    httpMethod = event['httpMethod']
    path = event['path']
    if httpMethod == getMethod and path == healthPath:
        response = buildResponse(200)
    elif httpMethod == getMethod and path == plantPath:
        response = getPlant(event['queryStringParameters']['plantId'])
    elif httpMethod == getMethod and path == plantsPath:
        response = getPlants()
    elif httpMethod == postMethod and path == plantPath:
        response = savePlant(json.loads(event['body']))
    elif httpMethod == patchMethod and path == plantPath:
        requestBody = json.loads(event['body'])
        response = modifyPlant(requestBody['plantId'], requestBody['updateKey'], requestBody['updateValue'])
    elif httpMethod == deleteMethod and path == plantPath:
        requestBody = json.loads(event['body'])
        response = deletePlant(requestBody['plantId'])
    else:
        response = buildResponse(404, 'Not Found')

    return response

def getPlant(plantId):
    try:
        response = table.get_item(
            Key = {
                'plantId': plantId
            }
        )
        if 'Item' in response:
            return buildResponse(200, response['Item'])
        else:
            return buildResponse(404, {'Message': 'PlantId: %s not found' % plantId})
    except:
        logger.exception('ERROR')

def getPlants():
    try:
        response = table.scan()
        result = response['Items']

        while 'LastEvaluatedKey' in response:
            response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            result.extend(response['Item'])

        body = {
            'plants': response
        }

        return buildResponse(200, body)
    except:
        logger.exception('ERROR')

def savePlant(requestBody):
    try:
        table.put_item(Item=requestBody)
        body = {
            'Operation': 'SAVE',
            'Message': 'SUCCESS',
            'Item': requestBody
        }
        return buildResponse(200, body)
    except:
        logger.exception('ERROR')

def modifyPlant(plantId, updateKey, updateValue):
    try:
        response = table.update_item(
            Key={
                'plantId': plantId
            },
            UpdateExpression='set %s = :value' % updateKey,
            ExpressionAttributeValues={
                ':value': updateValue
            },
            ReturnValues='UPDATED_NEW'
        )
        body = {
            'Operation': 'UPDATE',
            'Message': 'SUCCESS',
            'UpdatedAttributes': response
        }
        return buildResponse(200, body)
    except:
        logger.exception('ERROR')

def deletePlant(plantId):
    try:
        response = table.delete_item(
            Key={
                'plantId': plantId
            },
            ReturnValues='ALL_OLD'
        )
        body = {
            'Operation': 'DELETE',
            'Message': 'SUCCESS',
            'DeletedItem': response
        }
        return buildResponse(200, body)
    except:
        logger.exception('ERROR')

def buildResponse(statusCode, body=None):
    response = {
        'statusCode': statusCode,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }

    if body is not None:
        response['body'] = json.dumps(body, cls=CustomEncoder)
    return response
