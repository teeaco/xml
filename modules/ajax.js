class Ajax {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @returns {Promise<{data: any, status: number}>} - Промис с ответом
     */
    async get(url) {
        try {
            const response = await fetch(url);
            const data = await this._handleResponse(response);
            return { data, status: response.status };
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @returns {Promise<{data: any, status: number}>} - Промис с ответом
     */
    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await this._handleResponse(response);
            return { data: responseData, status: response.status };
        } catch (error) {
            console.error('POST request failed:', error);
            throw error;
        }
    }

    /**
     * PATCH запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @returns {Promise<{data: any, status: number}>} - Промис с ответом
     */
    async patch(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await this._handleResponse(response);
            return { data: responseData, status: response.status };
        } catch (error) {
            console.error('PATCH request failed:', error);
            throw error;
        }
    }

    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @returns {Promise<{data: any, status: number}>} - Промис с ответом
     */
    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });
            const data = await this._handleResponse(response);
            return { data, status: response.status };
        } catch (error) {
            console.error('DELETE request failed:', error);
            throw error;
        }
    }

    /**
     * Обработчик ответа (приватный метод)
     * @param {Response} response - Объект ответа fetch
     * @returns {Promise<any>} - Промис с распарсенными данными
     */
    async _handleResponse(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        try {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            return await response.text();
        } catch (e) {
            console.error('Ошибка парсинга ответа:', e);
            return null;
        }
    }
}

export const ajax = new Ajax();