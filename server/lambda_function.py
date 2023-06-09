import json
import boto3
import logging
from custom_encoder import CustomEncoder

logger = logging.getLogger()
logger.setLevel(logging.INFO)

plantTableName = 'plants'
cartTableName = 'bloom-plants'
orderTableName = 'bloom-orders'
dynamodb = boto3.resource('dynamodb')
plantTable = dynamodb.Table(plantTableName)
cartTable = dynamodb.Table(cartTableName)
orderTable = dynamodb.Table(orderTableName)

getMethod = 'GET'
postMethod = 'POST'
patchMethod = 'PATCH'
deleteMethod = 'DELETE'
healthPath = '/health'
plantPath = '/plant'
plantsPath = '/plants'
cartPath = '/cart'
orderPath = "/order"
ordersPath = "/orders"


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
    elif httpMethod == getMethod and path == cartPath:
        response = getCartItems(event['queryStringParameters']['cartId'])
    elif httpMethod == postMethod and path == cartPath:
        response = saveCart(json.loads(event['body']))
    elif httpMethod == patchMethod and path == cartPath:
        requestBody = json.loads(event['body'])
        response = modifyCart(requestBody['cartId'], requestBody['updateKey'], requestBody['updateValue'])
    elif httpMethod == getMethod and path == orderPath:
        response = getOrder(event['queryStringParameters']['orderId'])
    elif httpMethod == getMethod and path == ordersPath:
        response = getOrders()
    elif httpMethod == postMethod and path == orderPath:
        response = saveOrder(json.loads(event['body']))
    else:
        response = buildResponse(404, 'Not Found')

    return response

def getPlant(plantId):
    try:
        response = plantTable.get_item(
            Key = {
                'plantId': plantId
            }
        )
        if 'Item' in response:
            return buildResponse(200, response['Item'])
        else:
            return buildResponse(404, {'Message': 'PlandId: %s not found' % plantId})
    except:
        logger.exception('ERROR')

def getPlants():
    try:
        response = plantTable.scan()
        result = response['Item']

        while 'LastEvaluatedKey' in response:
            response = plantTable.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            result.extend(response['Item'])

        body = {
            'plants': response
        }

        return buildResponse(200, body)
    except:
        logger.exception('ERROR')

def savePlant(requestBody):
    try:
        plantTable.put_item(Item=requestBody)
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
        response = plantTable.update_item(
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
        response = plantTable.delete_item(
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

# SHOPPING CART
def getCartItems():
    pass #REMOVE THIS
    try:
        response = cartTable.scan()
        result = response['Item']

        while 'LastEvaluatedKey' in response:
            response = cartTable.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            result.extend(response['Item'])

        body = {
            'plants': response
        }

        return buildResponse(200, body)
    except:
        logger.exception('ERROR')

def saveCart():
    pass

def modifyCart():
    pass

# ORDERS
def getOrders(userId):
    pass

def getOrder(orderId):
    pass

def saveOrder():
    pass

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
