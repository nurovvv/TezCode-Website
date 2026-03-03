const fs = require('fs');

const filePath = 'c:\\\\Users\\\\nurov\\\\Desktop\\\\TezCode\\\\client\\\\src\\\\pages\\\\CourseReaderPage.jsx';

let content = fs.readFileSync(filePath, 'utf-8');

const mlContentMap = {
    "ml_getting_started": "Machine learning is making the computer learn from studying data and statistics. Machine Learning is a step into the direction of artificial intelligence. In Machine Learning, we build models to understand the data, and predict outcomes.",
    "ml_mean_median_mode": "In Machine Learning, we often look at Mean, Median, and Mode. Mean is the average value. Median is the middle value. Mode is the most common value. We can use the NumPy library to easily find these values.",
    "ml_standard_deviation": "Standard deviation is a number that describes how spread out the values are. A low standard deviation means that most of the numbers are close to the mean value. A high standard deviation means that the values are spread out over a wider range.",
    "ml_percentile": "Percentiles are used in statistics to give you a number that describes the value that a given percent of the values are lower than. For example, the 75th percentile is the value at which 75% of the values are lower.",
    "ml_data_distribution": "Earlier in this tutorial we have worked with very small amounts of data in our examples, just to understand the different concepts. In the real world, the data sets are much bigger, but it can be difficult to gather real world data.",
    "ml_normal_data_distribution": "We learned how to create a completely random array, of a given size, and between two given values. In this chapter we will learn how to create an array where the values are concentrated around a given value.",
    "ml_scatter_plot": "A scatter plot is a diagram where each value in the data set is represented by a dot. The Matplotlib module has a method for drawing scatter plots, it needs two arrays of the same length, one for the values of the x-axis, and one for the values of the y-axis.",
    "ml_linear_regression": "The term regression is used when you try to find the relationship between variables. In Machine Learning, and in statistical modeling, that relationship is used to predict the outcome of future events. Linear regression uses the relationship between the data-points to draw a straight line through all them.",
    "ml_polynomial_regression": "If your data points clearly will not fit a linear regression (a straight line through all data points), it might be ideal for polynomial regression. Polynomial regression, like linear regression, uses the relationship between the variables x and y to find the best way to draw a line through the data points.",
    "ml_multiple_regression": "Multiple regression is like linear regression, but with more than one independent value, meaning that we try to predict a value based on two or more variables.",
    "ml_scale": "When your data has different values, and even different measurement units, it can be difficult to compare them. What is kilograms compared to meters? Or altitude compared to time? We can scale data into new values that are easier to compare.",
    "ml_train_test": "In Machine Learning we create models to predict the outcome of certain events. To measure if the model is good enough, we can use a method called Train/Test. Train/Test is a method to measure the accuracy of your model.",
    "ml_decision_tree": "A Decision Tree is a Flow Chart, and can help you make decisions based on previous experience. In the example, a person will try to decide if he/she should go to a comedy show or not.",
    "ml_confusion_matrix": "It is a table that is used in classification problems to assess where errors in the model were made. The rows represent the actual classes the outcomes should have been. While the columns represent the predictions we have made.",
    "ml_hierarchical_clustering": "Hierarchical clustering is an unsupervised learning method for clustering data points. The algorithm builds clusters by measuring the dissimilarities between data. Unsupervised learning means that a model does not have to be trained.",
    "ml_logistic_regression": "Logistic regression aims to solve classification problems. It does this by predicting categorical outcomes, unlike linear regression that predicts a continuous outcome.",
    "ml_grid_search": "The majority of machine learning models contain parameters that can be adjusted to vary how the model learns. Grid search is a method to find the optimal objective values for a set of hyperparameters.",
    "ml_categorical_data": "When your data has categories represented by strings, it will be difficult to use them to train machine learning models which often only accept numeric data. We can convert these categories into numbers to make our models work.",
    "ml_k_means": "K-means is an unsupervised learning method for clustering data points. The algorithm iteratively divides data points into K clusters by minimizing the variance in each cluster.",
    "ml_bootstrap_aggregation": "Bootstrap Aggregation (Bagging) is an ensemble method where multiple models are trained on different subsets of the data and their predictions are aggregated to improve accuracy and prevent overfitting.",
    "ml_cross_validation": "When adjusting models we are aiming to increase overall model performance on unseen data. Cross validation is a method where we hold out subsets of the data for testing and train on the remainder.",
    "ml_auc_roc_curve": "In classification, there are many different evaluation metrics. The most popular is AUC - ROC curve. The ROC curve shows the trade-off between the true positive rate and false positive rate.",
    "ml_k_nearest_neighbors": "KNN is a simple, supervised machine learning algorithm that can be used to solve both classification and regression problems. It relies on the labeled input data to learn a function that produces an appropriate output when given new unlabeled data."
};

let updatedContent = content;

for (const [key, text] of Object.entries(mlContentMap)) {
    const slug = key.replace(/_/g, '-') + '-basics';
    // Match the id and replacing the content string that starts with <p> and ends with </p>
    const regex = new RegExp(`(id:\\s*'${slug}'.*?content:\\s*\`<p>).*?(</p>\`)`, 's');
    updatedContent = updatedContent.replace(regex, `$1${text}$2`);
}

fs.writeFileSync(filePath, updatedContent, 'utf-8');
console.log("Update complete");
