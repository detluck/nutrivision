import json
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
from sklearn.metrics import precision_score, recall_score, accuracy_score
from sklearn.metrics import precision_recall_curve, ConfusionMatrixDisplay
import numpy as np


def create_model_summary_pdf(true_labels:np.ndarray, model_predictions:np.ndarray):
    # Visualize class predictions

    with PdfPages as pdf:
        fig, ax = plt.subplots()
        plt.figure(figsize=(16, 14))
        ConfusionMatrixDisplay.from_predictions(true_labels, model_predictions)
        plt.title("Base model predictions")
        plt.savefig("model_performance/base_model")
        pdf.savefig(plt.gcf())
        plt.close(fig)

        # Calculating and saving the metrics
        recall = recall_score(true_labels, model_predictions, average='macro')
        precision = precision_score(true_labels, model_predictions, average='macro')
        accuracy = accuracy_score(true_labels, model_predictions)
        print(f"Recall: {recall:.2f}")
        print(f"Precision: {precision:.2f}")
        model_perf_dict = {"recall": recall, "precision": precision, "accuracy": accuracy}

        with open("model_performance/base_model/model_perf.json", "w") as f:
            json.dump(model_perf_dict, f)

        model_info = [
            ["accuracy", accuracy],
            ["precision", precision],
            ["recall", recall]
        ]
        ax.axis('off')
        table = ax.table(cellText=model_info, colLabels=["Metric", "Value"], cellLoc="center", loc="center")
        table.auto_set_font_size(False)
        table.set_fontsize(12)
        table.scale(1, 2)
        pdf.savefig(fig)
        plt.close(fig)

